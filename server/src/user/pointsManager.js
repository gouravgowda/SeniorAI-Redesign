const admin = require('firebase-admin');

// Points configuration for different activities
const POINTS_CONFIG = {
    QUIZ_COMPLETED: 10,
    ROADMAP_STEP_COMPLETED: 25,
    DAILY_LOGIN: 5,
    RESOURCE_VIEWED: 2,
    PROJECT_COMPLETED: 50,
    MENTOR_CHAT_STARTED: 5,
    PROFILE_COMPLETED: 20,
};

// Badge thresholds
const BADGES = {
    BRONZE: 0,
    SILVER: 100,
    GOLD: 500,
    PLATINUM: 1000,
    DIAMOND: 2500,
};

/**
 * Add points to a user's account
 * @param {string} userId - User ID
 * @param {string} activity - Activity type (from POINTS_CONFIG)
 * @param {number} customAmount - Optional custom point amount (overrides config)
 */
async function addPoints(userId, activity, customAmount = null) {
    try {
        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);

        // Get current user data
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            throw new Error('User not found');
        }

        const userData = userDoc.data();
        const currentPoints = userData.points || 0;
        const pointsToAdd = customAmount || POINTS_CONFIG[activity] || 0;

        const newPoints = currentPoints + pointsToAdd;
        const previousBadge = calculateBadge(currentPoints);
        const newBadge = calculateBadge(newPoints);

        // Update user points
        await userRef.update({
            points: newPoints,
            badge: newBadge,
            lastPointsUpdate: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Log activity in activity collection
        await db.collection('activities').add({
            userId,
            activity,
            pointsEarned: pointsToAdd,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        return {
            success: true,
            pointsAdded: pointsToAdd,
            totalPoints: newPoints,
            badge: newBadge,
            badgeUpgraded: newBadge !== previousBadge,
        };
    } catch (error) {
        console.error('Error adding points:', error);
        throw error;
    }
}

/**
 * Get user's total points
 * @param {string} userId - User ID
 */
async function getUserPoints(userId) {
    try {
        const db = admin.firestore();
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return { points: 0, badge: 'BRONZE' };
        }

        const userData = userDoc.data();
        return {
            points: userData.points || 0,
            badge: userData.badge || 'BRONZE',
        };
    } catch (error) {
        console.error('Error getting user points:', error);
        throw error;
    }
}

/**
 * Get leaderboard (top N users)
 * @param {string} timeframe - 'all', 'monthly', 'weekly'
 * @param {number} limit - Number of users to return
 */
async function getLeaderboard(timeframe = 'all', limit = 100) {
    try {
        const db = admin.firestore();
        let query = db.collection('users')
            .where('points', '>', 0)
            .orderBy('points', 'desc')
            .limit(limit);

        // For monthly/weekly, we'd need to filter by lastPointsUpdate
        // Simplified for now - returns all-time leaderboard

        const snapshot = await query.get();

        const leaderboard = [];
        let rank = 1;

        snapshot.forEach(doc => {
            const data = doc.data();
            leaderboard.push({
                rank,
                userId: doc.id,
                username: data.username || data.displayName || 'Anonymous',
                points: data.points || 0,
                badge: data.badge || 'BRONZE',
                avatar: data.photoURL || null,
            });
            rank++;
        });

        return leaderboard;
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        throw error;
    }
}

/**
 * Get user's rank
 * @param {string} userId - User ID
 */
async function getUserRank(userId) {
    try {
        const db = admin.firestore();
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return { rank: null, totalPoints: 0 };
        }

        const userData = userDoc.data();
        const userPoints = userData.points || 0;

        // Count users with more points
        const higherRankedSnapshot = await db.collection('users')
            .where('points', '>', userPoints)
            .get();

        const rank = higherRankedSnapshot.size + 1;

        return {
            rank,
            totalPoints: userPoints,
            badge: userData.badge || 'BRONZE',
        };
    } catch (error) {
        console.error('Error getting user rank:', error);
        throw error;
    }
}

/**
 * Calculate badge based on points
 * @param {number} points - Total points
 */
function calculateBadge(points) {
    if (points >= BADGES.DIAMOND) return 'DIAMOND';
    if (points >= BADGES.PLATINUM) return 'PLATINUM';
    if (points >= BADGES.GOLD) return 'GOLD';
    if (points >= BADGES.SILVER) return 'SILVER';
    return 'BRONZE';
}

/**
 * Get user's recent activities
 * @param {string} userId - User ID
 * @param {number} limit - Number of activities to return
 */
async function getUserActivities(userId, limit = 10) {
    try {
        const db = admin.firestore();
        const activitiesSnapshot = await db.collection('activities')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();

        const activities = [];
        activitiesSnapshot.forEach(doc => {
            activities.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return activities;
    } catch (error) {
        console.error('Error getting user activities:', error);
        throw error;
    }
}

module.exports = {
    addPoints,
    getUserPoints,
    getLeaderboard,
    getUserRank,
    getUserActivities,
    POINTS_CONFIG,
    BADGES,
};
