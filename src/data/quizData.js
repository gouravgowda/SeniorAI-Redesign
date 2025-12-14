// Quiz data for all roadmap steps
export const quizData = {
    // AI & Machine Learning Quizzes
    'step_1': {
        title: 'Python Programming Fundamentals Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is the correct way to create a list in Python?',
                options: [
                    'list = (1, 2, 3)',
                    'list = [1, 2, 3]',
                    'list = {1, 2, 3}',
                    'list = <1, 2, 3>'
                ],
                correctAnswer: 1,
                explanation: 'Square brackets [] are used to create lists in Python. Parentheses () create tuples, and curly braces {} create sets or dictionaries.'
            },
            {
                id: 'q2',
                question: 'Which keyword is used to define a function in Python?',
                options: [
                    'function',
                    'define',
                    'def',
                    'func'
                ],
                correctAnswer: 2,
                explanation: 'The "def" keyword is used to define functions in Python, followed by the function name and parameters.'
            },
            {
                id: 'q3',
                question: 'What will be the output of: print(type([1, 2, 3]))?',
                options: [
                    '<class \'tuple\'>',
                    '<class \'list\'>',
                    '<class \'array\'>',
                    '<class \'dict\'>'
                ],
                correctAnswer: 1,
                explanation: 'The type() function returns the data type. [1, 2, 3] is a list, so it returns <class \'list\'>.'
            },
            {
                id: 'q4',
                question: 'Which of the following is a mutable data type in Python?',
                options: [
                    'tuple',
                    'string',
                    'list',
                    'int'
                ],
                correctAnswer: 2,
                explanation: 'Lists are mutable, meaning their elements can be changed after creation. Tuples, strings, and integers are immutable.'
            },
            {
                id: 'q5',
                question: 'What is the purpose of the __init__ method in Python classes?',
                options: [
                    'To delete an object',
                    'To initialize object attributes',
                    'To create a class',
                    'To inherit from parent class'
                ],
                correctAnswer: 1,
                explanation: 'The __init__ method is the constructor in Python classes, used to initialize object attributes when an instance is created.'
            }
        ]
    },
    'step_2': {
        title: 'NumPy & Pandas Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is the primary data structure in Pandas?',
                options: [
                    'Array',
                    'DataFrame',
                    'Matrix',
                    'Table'
                ],
                correctAnswer: 1,
                explanation: 'DataFrame is the primary 2D data structure in Pandas, representing data in a table format with rows and columns.'
            },
            {
                id: 'q2',
                question: 'Which NumPy function creates an array of zeros?',
                options: [
                    'np.empty()',
                    'np.zeros()',
                    'np.null()',
                    'np.blank()'
                ],
                correctAnswer: 1,
                explanation: 'np.zeros() creates an array filled with zeros. np.empty() creates uninitialized array.'
            },
            {
                id: 'q3',
                question: 'How do you select the first 5 rows of a Pandas DataFrame df?',
                options: [
                    'df.first(5)',
                    'df.head()',
                    'df[:5]',
                    'Both B and C'
                ],
                correctAnswer: 3,
                explanation: 'Both df.head() (defaults to 5) and df[:5] (slicing) can select the first 5 rows of a DataFrame.'
            },
            {
                id: 'q4',
                question: 'What does broadcasting mean in NumPy?',
                options: [
                    'Converting data types',
                    'Operating on arrays of different shapes',
                    'Sending data over network',
                    'Printing array values'
                ],
                correctAnswer: 1,
                explanation: 'Broadcasting allows NumPy to perform operations on arrays of different shapes by automatically expanding dimensions.'
            },
            {
                id: 'q5',
                question: 'Which method is used to handle missing values in Pandas?',
                options: [
                    'dropna() or fillna()',
                    'remove() or replace()',
                    'delete() or update()',
                    'clear() or set()'
                ],
                correctAnswer: 0,
                explanation: 'dropna() removes rows/columns with missing values, while fillna() fills missing values with specified data.'
            }
        ]
    },
    'step_3': {
        title: 'Mathematics for ML Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is a scalar in linear algebra?',
                options: [
                    'A matrix with one row',
                    'A single number',
                    'A vector',
                    'A tensor'
                ],
                correctAnswer: 1,
                explanation: 'A scalar is a single numerical value, as opposed to vectors (1D arrays) or matrices (2D arrays).'
            },
            {
                id: 'q2',
                question: 'The derivative represents:',
                options: [
                    'The area under a curve',
                    'The rate of change',
                    'The average value',
                    'The maximum point'
                ],
                correctAnswer: 1,
                explanation: 'The derivative measures the instantaneous rate of change of a function at a given point.'
            },
            {
                id: 'q3',
                question: 'What is the result of multiplying a 3x2 matrix by a 2x4 matrix?',
                options: [
                    '3x4 matrix',
                    '2x2 matrix',
                    '3x2 matrix',
                    'Undefined'
                ],
                correctAnswer: 0,
                explanation: 'When multiplying matrices, the result has dimensions (rows of first) x (columns of second), so 3x2 × 2x4 = 3x4.'
            },
            {
                id: 'q4',
                question: 'In probability, what does P(A|B) represent?',
                options: [
                    'Probability of A or B',
                    'Probability of A and B',
                    'Probability of A given B',
                    'Probability of A minus B'
                ],
                correctAnswer: 2,
                explanation: 'P(A|B) is conditional probability - the probability of event A occurring given that event B has occurred.'
            },
            {
                id: 'q5',
                question: 'What is gradient descent used for?',
                options: [
                    'Finding maximum values',
                    'Sorting data',
                    'Minimizing a cost function',
                    'Plotting graphs'
                ],
                correctAnswer: 2,
                explanation: 'Gradient descent is an optimization algorithm used to minimize a cost/loss function by iteratively moving toward the steepest descent.'
            }
        ]
    },
    'step_4': {
        title: 'Supervised Learning Basics Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is the main difference between classification and regression?',
                options: [
                    'Classification predicts categories, regression predicts continuous values',
                    'Classification is faster than regression',
                    'Regression uses neural networks, classification doesn\'t',
                    'They are the same'
                ],
                correctAnswer: 0,
                explanation: 'Classification predicts discrete class labels (e.g., spam/not spam), while regression predicts continuous numerical values (e.g., house prices).'
            },
            {
                id: 'q2',
                question: 'What does overfitting mean?',
                options: [
                    'Model performs well on all data',
                    'Model is too simple',
                    'Model memorizes training data but fails on new data',
                    'Model training takes too long'
                ],
                correctAnswer: 2,
                explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and performs poorly on unseen data.'
            },
            {
                id: 'q3',
                question: 'Which metric is best for imbalanced classification problems?',
                options: [
                    'Accuracy',
                    'F1-score or AUC-ROC',
                    'Mean Squared Error',
                    'R-squared'
                ],
                correctAnswer: 1,
                explanation: 'F1-score balances precision and recall, making it better for imbalanced datasets. Accuracy can be misleading when classes are imbalanced.'
            },
            {
                id: 'q4',
                question: 'What is the purpose of cross-validation?',
                options: [
                    'To speed up training',
                    'To evaluate model performance on different data splits',
                    'To clean the data',
                    'To select features'
                ],
                correctAnswer: 1,
                explanation: 'Cross-validation evaluates model performance by training and testing on different subsets of data, providing a more reliable performance estimate.'
            },
            {
                id: 'q5',
                question: 'In a decision tree, what is a leaf node?',
                options: [
                    'The root of the tree',
                    'A decision point',
                    'A final prediction/output',
                    'A branch'
                ],
                correctAnswer: 2,
                explanation: 'Leaf nodes are the terminal nodes in a decision tree that contain the final prediction or classification result.'
            }
        ]
    },
    'step_5': {
        title: 'Unsupervised Learning Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is the main goal of clustering algorithms?',
                options: [
                    'Predict future values',
                    'Group similar data points together',
                    'Classify labeled data',
                    'Reduce dataset size'
                ],
                correctAnswer: 1,
                explanation: 'Clustering algorithms group similar data points together without prior labels, discovering natural patterns in the data.'
            },
            {
                id: 'q2',
                question: 'What does PCA stand for?',
                options: [
                    'Primary Component Analysis',
                    'Principal Component Analysis',
                    'Practical Cluster Algorithm',
                    'Predictive Classification Algorithm'
                ],
                correctAnswer: 1,
                explanation: 'PCA (Principal Component Analysis) is a dimensionality reduction technique that transforms data to new coordinate system.'
            },
            {
                id: 'q3',
                question: 'How does K-means clustering determine K?',
                options: [
                    'Automatically during training',
                    'It must be specified beforehand',
                    'Based on dataset size',
                    'Random selection'
                ],
                correctAnswer: 1,
                explanation: 'K-means requires you to specify the number of clusters (K) before running the algorithm. Methods like elbow method help choose optimal K.'
            },
            {
                id: 'q4',
                question: 'What is the curse of dimensionality?',
                options: [
                    'Too many features making data sparse',
                    'Dataset is too small',
                    'Too many classes to predict',
                    'Training takes too long'
                ],
                correctAnswer: 0,
                explanation: 'The curse of dimensionality refers to problems that arise when working with high-dimensional data, where data becomes increasingly sparse.'
            },
            {
                id: 'q5',
                question: 'What is anomaly detection used for?',
                options: [
                    'Finding average values',
                    'Identifying unusual/outlier data points',
                    'Sorting data',
                    'Feature selection'
                ],
                correctAnswer: 1,
                explanation: 'Anomaly detection identifies data points that deviate significantly from normal patterns, useful for fraud detection, system monitoring, etc.'
            }
        ]
    },
    'step_6': {
        title: 'Deep Learning Fundamentals Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is a perceptron?',
                options: [
                    'A loss function',
                    'The simplest form of a neural network',
                    'An activation function',
                    'A training algorithm'
                ],
                correctAnswer: 1,
                explanation: 'A perceptron is the most basic unit of a neural network, consisting of inputs, weights, and an activation function.'
            },
            {
                id: 'q2',
                question: 'What does the activation function do?',
                options: [
                    'Calculates the loss',
                    'Introduces non-linearity to the network',
                    'Optimizes weights',
                    'Normalizes inputs'
                ],
                correctAnswer: 1,
                explanation: 'Activation functions introduce non-linearity, allowing neural networks to learn complex patterns. Without them, networks would only learn linear relationships.'
            },
            {
                id: 'q3',
                question: 'What is backpropagation?',
                options: [
                    'Forward pass through network',
                    'Algorithm to update weights by propagating errors backward',
                    'Data preprocessing method',
                    'Testing procedure'
                ],
                correctAnswer: 1,
                explanation: 'Backpropagation calculates gradients of the loss function with respect to weights by propagating errors backward through the network.'
            },
            {
                id: 'q4',
                question: 'What is the purpose of dropout in neural networks?',
                options: [
                    'Speed up training',
                    'Prevent overfitting',
                    'Increase accuracy',
                    'Reduce dataset size'
                ],
                correctAnswer: 1,
                explanation: 'Dropout randomly deactivates neurons during training, preventing overfitting by forcing the network to learn robust features.'
            },
            {
                id: 'q5',
                question: 'Which optimizer is most commonly used in deep learning?',
                options: [
                    'Gradient Descent',
                    'Adam',
                    'Newton\'s Method',
                    'Linear Regression'
                ],
                correctAnswer: 1,
                explanation: 'Adam (Adaptive Moment Estimation) is widely used because it combines benefits of AdaGrad and RMSprop, adapting learning rates efficiently.'
            }
        ]
    },
    'step_7': {
        title: 'Computer Vision with CNNs Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What does CNN stand for?',
                options: [
                    'Computer Neural Network',
                    'Convolutional Neural Network',
                    'Connected Neural Network',
                    'Cascading Neural Network'
                ],
                correctAnswer: 1,
                explanation: 'CNN stands for Convolutional Neural Network, a specialized architecture for processing grid-like data such as images.'
            },
            {
                id: 'q2',
                question: 'What is the main purpose of a convolutional layer?',
                options: [
                    'Reduce image size',
                    'Extract features from images',
                    'Classify images',
                    'Normalize pixels'
                ],
                correctAnswer: 1,
                explanation: 'Convolutional layers apply filters to extract features like edges, textures, and patterns from images.'
            },
            {
                id: 'q3',
                question: 'What is pooling used for in CNNs?',
                options: [
                    'Increasing image resolution',
                    'Reducing spatial dimensions and computation',
                    'Adding more layers',
                    'Training faster'
                ],
                correctAnswer: 1,
                explanation: 'Pooling (like max pooling) reduces spatial dimensions, decreases computation, and provides translation invariance.'
            },
            {
                id: 'q4',
                question: 'What is transfer learning?',
                options: [
                    'Transferring data between servers',
                    'Using pre-trained models on new tasks',
                    'Moving models to production',
                    'Converting model formats'
                ],
                correctAnswer: 1,
                explanation: 'Transfer learning uses knowledge from pre-trained models (like ResNet, VGG) to solve new but related tasks, saving time and data.'
            },
            {
                id: 'q5',
                question: 'What is image augmentation?',
                options: [
                    'Increasing image quality',
                    'Creating variations of training images',
                    'Removing noise from images',
                    'Converting image formats'
                ],
                correctAnswer: 1,
                explanation: 'Image augmentation creates variations (rotation, flip, zoom) of training images to increase dataset size and prevent overfitting.'
            }
        ]
    },
    'step_8': {
        title: 'Natural Language Processing Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is tokenization in NLP?',
                options: [
                    'Converting text to numbers',
                    'Breaking text into smaller units (words/sentences)',
                    'Removing stopwords',
                    'Translating languages'
                ],
                correctAnswer: 1,
                explanation: 'Tokenization splits text into smaller units like words or sentences, which is the first step in most NLP pipelines.'
            },
            {
                id: 'q2',
                question: 'What are word embeddings?',
                options: [
                    'Images in documents',
                    'Dense vector representations of words',
                    'Dictionary definitions',
                    'Grammatical rules'
                ],
                correctAnswer: 1,
                explanation: 'Word embeddings (like Word2Vec, GloVe) represent words as dense vectors that capture semantic relationships.'
            },
            {
                id: 'q3',
                question: 'What does BERT stand for?',
                options: [
                    'Basic Encoder Representation Transformer',
                    'Bidirectional Encoder Representations from Transformers',
                    'Binary Encoded Recurrent Transformer',
                    'Batch Encoded Regression Transformer'
                ],
                correctAnswer: 1,
                explanation: 'BERT is a transformer-based model that reads text bidirectionally to understand context from both directions.'
            },
            {
                id: 'q4',
                question: 'What is the attention mechanism in transformers?',
                options: [
                    'Error checking method',
                    'Allows model to focus on relevant parts of input',
                    'Activation function',
                    'Loss calculation'
                ],
                correctAnswer: 1,
                explanation: 'Attention mechanism allows the model to weigh the importance of different words when processing each word in a sequence.'
            },
            {
                id: 'q5',
                question: 'What is sentiment analysis?',
                options: [
                    'Counting word frequency',
                    'Determining emotional tone of text',
                    'Translating text',
                    'Correcting grammar'
                ],
                correctAnswer: 1,
                explanation: 'Sentiment analysis determines whether text expresses positive, negative, or neutral emotions/opinions.'
            }
        ]
    },
    'step_9': {
        title: 'Model Deployment & MLOps Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is MLOps?',
                options: [
                    'Machine Learning Operations',
                    'Multiple Layer Options',
                    'Model Learning Optimization',
                    'Math Logic Operations'
                ],
                correctAnswer: 0,
                explanation: 'MLOps (Machine Learning Operations) is a set of practices for deploying and maintaining ML models in production reliably and efficiently.'
            },
            {
                id: 'q2',
                question: 'What is Docker primarily used for?',
                options: [
                    'Training models',
                    'Containerizing applications',
                    'Data visualization',
                    'Feature engineering'
                ],
                correctAnswer: 1,
                explanation: 'Docker creates containers that package applications with all dependencies, ensuring consistent behavior across environments.'
            },
            {
                id: 'q3',
                question: 'What is model versioning?',
                options: [
                    'Updating Python version',
                    'Tracking different versions of trained models',
                    'Checking software versions',
                    'Dataset updates'
                ],
                correctAnswer: 1,
                explanation: 'Model versioning tracks different iterations of models, allowing rollback and comparison of model performance over time.'
            },
            {
                id: 'q4',
                question: 'What is A/B testing in ML deployment?',
                options: [
                    'Testing two datasets',
                    'Comparing two model versions in production',
                    'Alphabet classification',
                    'Testing accuracy'
                ],
                correctAnswer: 1,
                explanation: 'A/B testing deploys two model versions to different user groups to compare performance before full rollout.'
            },
            {
                id: 'q5',
                question: 'What is model monitoring?',
                options: [
                    'Watching training progress',
                    'Tracking model performance in production',
                    'Visualizing data',
                    'Code review'
                ],
                correctAnswer: 1,
                explanation: 'Model monitoring tracks metrics like accuracy, latency, and data drift to ensure models perform well in production over time.'
            }
        ]
    },
    'step_10': {
        title: 'Advanced Topics Quiz',
        questions: [
            {
                id: 'q1',
                question: 'What is reinforcement learning?',
                options: [
                    'Learning from labeled data',
                    'Learning through trial and error with rewards',
                    'Clustering similar data',
                    'Reducing dimensions'
                ],
                correctAnswer: 1,
                explanation: 'Reinforcement learning trains agents to make decisions by rewarding desired behaviors and penalizing undesired ones.'
            },
            {
                id: 'q2',
                question: 'What does GAN stand for?',
                options: [
                    'General Adversarial Network',
                    'Generative Adversarial Network',
                    'Gradient Activation Network',
                    'Grouped Analysis Network'
                ],
                correctAnswer: 1,
                explanation: 'GAN (Generative Adversarial Network) consists of two networks competing: a generator creating fake data and a discriminator detecting fakes.'
            },
            {
                id: 'q3',
                question: 'What is AutoML?',
                options: [
                    'Automatic car ML',
                    'Automating ML pipeline tasks',
                    'Self-driving algorithms',
                    'Auto-update models'
                ],
                correctAnswer: 1,
                explanation: 'AutoML automates tasks like feature selection, model selection, and hyperparameter tuning to make ML accessible to non-experts.'
            },
            {
                id: 'q4',
                question: 'What is few-shot learning?',
                options: [
                    'Learning with very few training examples',
                    'Short training time',
                    'Using few layers',
                    'Limited testing'
                ],
                correctAnswer: 0,
                explanation: 'Few-shot learning trains models to generalize from very few examples, mimicking human ability to learn from limited data.'
            },
            {
                id: 'q5',
                question: 'What is model quantization?',
                options: [
                    'Measuring model size',
                    'Reducing model size by using lower precision',
                    'Counting parameters',
                    'Quality assessment'
                ],
                correctAnswer: 1,
                explanation: 'Quantization reduces model size and speeds up inference by using lower precision (e.g., int8 instead of float32) for weights and activations.'
            }
        ]
    }
};

export default quizData;
