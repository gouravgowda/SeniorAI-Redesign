const admin = require('firebase-admin');

async function saveProgress(userId, stepId, completed) {
    try {
        const db = admin.firestore();
        const userRef = db.collection('users').doc(userId);

        // Get current user data
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }

        const userData = userDoc.data();
        const progress = userData.progress || {};

        // Update progress
        progress[stepId] = completed;

        // Calculate total progress
        const completedSteps = Object.values(progress).filter(val => val === true).length;
        const totalSteps = Object.keys(progress).length;
        const progressPercentage = totalSteps > 0 ? completedSteps / totalSteps : 0;

        // Update user document
        await userRef.update({
            progress,
            lastActive: admin.firestore.FieldValue.serverTimestamp()
        });

        // Find next recommended step (first incomplete step)
        const nextStep = Object.entries(progress)
            .find(([key, value]) => !value);

        return {
            success: true,
            totalProgress: progressPercentage,
            completedSteps,
            totalSteps,
            nextRecommendedStep: nextStep ? nextStep[0] : null
        };
    } catch (error) {
        console.error('Error in saveProgress:', error);
        throw error;
    }
}

module.exports = { saveProgress };
