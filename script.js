<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integers Digital Game App</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        .screen {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #001f3f; /* Navy Blue background color */
            color: white;
        }

        #container,
        #rulesContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #001f3f; /* Navy Blue background color */
            color: white;
        }

        #title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        #author {
            font-size: 18px;
            margin-bottom: 20px;
        }

        #timer {
            font-size: 18px;
            margin-bottom: 10px;
        }

        #currentProblem {
            font-size: 36px;
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 10px;
            background-color: #001f3f; /* Navy Blue background color */
            color: white;
        }

        #answer {
            font-size: 24px;
            width: 80%;
            max-width: 300px;
            margin-bottom: 20px;
        }

        #feedback {
            font-size: 18px;
            margin-bottom: 20px;
        }

        #submitBtn {
            font-size: 16px;
            padding: 10px 20px;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #statistics {
            font-size: 18px;
            margin-bottom: 20px;
        }

        #newGameBtn,
        #exitBtn {
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #newGameBtn {
            background-color: #3498db; /* Light Blue background color */
            color: white;
            margin-right: 10px;
        }

        #exitBtn {
            background-color: #e74c3c; /* Red background color */
            color: white;
        }

        #rulesBtn {
            font-size: 16px;
            padding: 10px 20px;
            background-color: #e74c3c; /* Red background color */
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #rulesContainer p,
        #rulesContainerContent p {
            font-size: 18px;
            max-width: 400px;
            margin: 20px;
            text-align: left;
        }
    </style>
</head>

<body>
    <!-- Main Game Screen -->
    <div id="container" class="screen">
        <div id="title">Integers Digital Game App</div>
        <div id="author">Romela A. Muyco</div>
        <div id="timer">Time: <span id="time">600</span> seconds</div>
        <div id="currentProblem"></div>
        <input type="text" id="answer" placeholder="Your Answer">
        <div id="feedback"></div>
        <button id="submitBtn" onclick="checkAnswer()">Submit</button>
        <button id="rulesBtn" onclick="showRules()">Show Rules</button>
        <div id="statistics">Correct: <span id="correctCount">0</span> | Wrong: <span id="wrongCount">0</span> | Total Answered: <span
                id="totalAttempts">0</span></div>
        <button id="newGameBtn" onclick="startNewGame()">New Game</button>
        <button id="exitBtn" onclick="exitGame()">Exit</button>
    </div>

    <!-- Rules Screen -->
    <div id="rulesContainer" class="screen">
        <div id="title">Integers Digital Game App</div>
        <div id="author">Romela A. Muyco</div>
        <div id="rulesContainerContent">
            <p>Rules on Integers:</p>
            <p>1. Addition: To add two integers, add their numerical values.</p>
            <p>2. Subtraction: To subtract an integer, add its opposite.</p>
            <p>3. Multiplication: The product of two integers with the same sign is positive, and with different signs is negative.</p>
            <p>4. Division: The quotient of two integers with the same sign is positive, and with different signs is negative. Ensure
                non-decimal quotient.</p>
        </div>
        <button id="backBtn" onclick="showMainScreen()">Back to Game</button>
    </div>

    <audio id="backgroundMusic" loop autoplay>
        <source src="background_music.mp3" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>

    <script>
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let totalAttempts = 0;
        const totalItems = 40; // 10 problems for each operation
        let timeLeft = 600; // 10 minutes

        function generateProblem() {
            const operations = ['+', '-', '*', '/'];
            const operation = operations[Math.floor(Math.random() * operations.length)];

            let num1, num2;

            switch (operation) {
                case '+':
                    num1 = Math.floor(Math.random() * 20) - 10;
                    num2 = Math.floor(Math.random() * 20) - 10;
                    break;
                case '-':
                    num1 = Math.floor(Math.random() * 20) - 10;
                    num2 = Math.floor(Math.random() * 20) - 10;
                    break;
                case '*':
                    num1 = Math.floor(Math.random() * 10) - 5;
                    num2 = Math.floor(Math.random() * 10) - 5;
                    break;
                case '/':
                    do {
                        num1 = Math.floor(Math.random() * 10) - 5;
                        num2 = Math.floor(Math.random() * 5) + 1;
                    } while (num1 % num2 !== 0); // Ensure non-decimal quotient
                    break;
                default:
                    break;
            }

            const problem = `${num1} ${operation} ${num2}`;
            document.getElementById('currentProblem').innerText = `Solve: ${problem}`;
            return problem;
        }

        function checkAnswer() {
            const problem = document.getElementById('currentProblem').innerText.replace('Solve: ', '');
            const userAnswer = parseInt(document.getElementById('answer').value, 10);
            const correctAnswer = eval(problem);

            const feedback = document.getElementById('feedback');
            if (userAnswer === correctAnswer) {
                feedback.innerText = 'Correct! Well done.';
                feedback.style.color = '#2ecc71';
                correctAnswers++;
            } else {
                feedback.innerText = 'Incorrect. Try again.';
                feedback.style.color = '#e74c3c';
                wrongAnswers++;
            }

            totalAttempts++;
            updateStatistics();

            // Generate a new problem after a brief delay
            setTimeout(() => {
                document.getElementById('answer').value = '';
                feedback.innerText = '';

                // Check for game completion
                if (totalAttempts === totalItems) {
                    showCongratulations();
                } else {
                    generateProblem();
                }
            }, 1000);
        }

        function updateStatistics() {
            document.getElementById('correctCount').innerText = correctAnswers;
            document.getElementById('wrongCount').innerText = wrongAnswers;
            document.getElementById('totalAttempts').innerText = totalAttempts;
        }

        function showCongratulations() {
            clearInterval(timerInterval);
            const percentageCorrect = (correctAnswers / totalAttempts) * 100;
            const congratsMessage = document.getElementById('feedback');
            congratsMessage.innerHTML = (percentageCorrect >= 80) ?
                `Congratulations! You got ${percentageCorrect}% correct. Well done!` :
                `Nice try! You got ${percentageCorrect}% correct. Keep practicing!`;

            congratsMessage.style.color = (percentageCorrect >= 80) ? '#2ecc71' : '#e74c3c';
        }

        function updateTimer() {
            const timerElement = document.getElementById('time');
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.innerText = timeLeft;
            } else {
                showCongratulations();
            }
        }

        function startNewGame() {
            correctAnswers = 0;
            wrongAnswers = 0;
            totalAttempts = 0;
            timeLeft = 600; // 10 minutes

            document.getElementById('feedback').innerText = '';
            document.getElementById('correctCount').innerText = '0';
            document.getElementById('wrongCount').innerText = '0';
            document.getElementById('totalAttempts').innerText = '0';
            document.getElementById('time').innerText = '600';

            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);

            generateProblem();
            showMainScreen(); // Show the main game screen
        }

        function exitGame() {
            clearInterval(timerInterval);
            document.getElementById('container').style.display = 'none';
            document.getElementById('rulesContainer').style.display = 'none';
        }

        // Initialize the game
        generateProblem();

        // Start the timer
        const timerInterval = setInterval(updateTimer, 1000);

        // Additional functions for screen switching
        function showRulesScreen() {
            document.getElementById('container').style.display = 'none';
            document.getElementById('rulesContainer').style.display = 'flex';
        }

        function showMainScreen() {
            document.getElementById('container').style.display = 'flex';
            document.getElementById('rulesContainer').style.display = 'none';
        }

        function showRules() {
            showRulesScreen();
        }
    </script>
</body>

</html>
