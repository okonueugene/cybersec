document.addEventListener('DOMContentLoaded', () => {
    // Functionality for collapsible sections
    const headers = document.querySelectorAll('.collapsible-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.toggle-icon');

            if (content.classList.contains('expanded')) {
                content.style.maxHeight = null;
                content.classList.remove('expanded');
                icon.textContent = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('expanded');
                icon.textContent = '–';
            }
        });
    });

    // Chart.js functionality
    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
            return label.join(' ');
        }
        return label;
    };

    const wrapLabel = (label) => {
        const maxLength = 16;
        if (label.length <= maxLength) {
            return label;
        }
        const words = label.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words) {
            if ((currentLine + word).length <= maxLength) {
                currentLine += `${word} `;
            } else {
                lines.push(currentLine.trim());
                currentLine = `${word} `;
            }
        }
        lines.push(currentLine.trim());
        return lines;
    };

    const redFlagsCtx = document.getElementById('redFlagsChart').getContext('2d');
    const redFlagsLabels = [
        'Suspicious Sender Address',
        'Urgency or Threats',
        'Generic Greetings',
        'Spelling & Grammar Mistakes',
        'Unexpected Attachments',
        'Mismatched Links (Hover Test)'
    ];
    new Chart(redFlagsCtx, {
        type: 'bar',
        data: {
            labels: redFlagsLabels.map(wrapLabel),
            datasets: [{
                label: 'Commonality Score',
                data: [90, 85, 75, 70, 65, 95],
                backgroundColor: ['#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43',
                    '#ffa600'
                ],
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: tooltipTitleCallback
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#374151'
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#374151',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });

    const attachmentsCtx = document.getElementById('attachmentsChart').getContext('2d');
    new Chart(attachmentsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Office Docs (.doc, .xls)', 'PDFs', 'Archives (.zip, .rar)',
                'Scripts (.js, .vbs)', 'Executables (.exe)'
            ],
            datasets: [{
                label: 'Malicious File Types',
                data: [37, 26, 15, 12, 10],
                backgroundColor: ['#2f4b7c', '#665191', '#a05195', '#d45087',
                    '#f95d6a'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#374151'
                    }
                },
                tooltip: {
                    callbacks: {
                        title: tooltipTitleCallback
                    }
                }
            }
        }
    });

    // Quiz 1 functions
    window.showQuiz1 = function () {
        document.getElementById('quiz1').classList.remove('hidden');
    }

    window.checkAnswer1 = function (button, isCorrect) {
        const resultDiv = document.getElementById('quiz1Result');
        resultDiv.classList.remove('hidden');
        if (isCorrect) {
            resultDiv.innerHTML =
                '<p class="text-green-600 font-bold">Excellent! Verifying the sender is a critical first step. You avoided a potential risk.</p>';
            button.classList.add('correct');
        } else {
            resultDiv.innerHTML =
                '<p class="text-red-600 font-bold">Caution! Opening unexpected attachments without verification can lead to malware infection or data theft. Always check the sender first.</p>';
            button.classList.add('incorrect');
        }
        const buttons = document.querySelectorAll('#quiz1 .quiz-button');
        buttons.forEach(btn => btn.disabled = true);
    }

    // Show detail for "Why Attacks So Successful" cards
    window.showDetail = function (id) {
        const detailElement = document.getElementById(`${id}-detail`);
        detailElement.classList.toggle('hidden');
    }

    // Animate card for "Types of Cyber Threats"
    window.animateCard = function (card) {
        card.classList.add('pulse-animation');
        setTimeout(() => {
            card.classList.remove('pulse-animation');
        }, 1000);
    }

    // Show method detail for "Common Methods Used to Threaten Cyber Security" cards
    window.showMethodDetail = function (id) {
        const detailElement = document.getElementById(`${id}-detail`);
        detailElement.classList.toggle('hidden');
    }

    // Highlight step for "Anatomy of a Phishing Attack" flowchart
    let currentHighlightedStep = null;
    window.highlightStep = function (stepElement, stepNumber) {
        if (currentHighlightedStep) {
            currentHighlightedStep.classList.remove('highlighted');
        }
        stepElement.classList.add('highlighted');
        currentHighlightedStep = stepElement;

        const feedbackMessages = [
            "Step 1: The 'Bait' is the initial deceptive email designed to pique your interest or instill urgency.",
            "Step 2: The 'Click' is where you interact with the malicious link or attachment, often due to curiosity or fear.",
            "Step 3: The 'Fake' is the fraudulent website or login page designed to mimic legitimate services, waiting for your input.",
            "Step 4: The 'Theft' is the final stage where your credentials or sensitive information are captured by the attacker."
        ];
        console.log(feedbackMessages[stepNumber - 1]);
    }

    // Phishing Quiz functions
    window.startPhishingQuiz = function () {
        document.getElementById('phishingQuiz').classList.remove('hidden');
        document.getElementById('phishingQuizResult').classList.add('hidden');
        const buttons = document.querySelectorAll('#phishingQuiz .quiz-button');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
    }

    window.checkPhishingQuiz = function (button, isCorrect) {
        const resultDiv = document.getElementById('phishingQuizResult');
        resultDiv.classList.remove('hidden');
        if (isCorrect) {
            resultDiv.innerHTML =
                '<p class="text-green-600 font-bold">Absolutely Correct! The suspicious sender domain (amaz0n-update.com), generic greeting, urgent and threatening language, and the request for immediate verification are all clear indicators of a phishing attempt. Well done!</p>';
            button.classList.add('correct');
        } else {
            resultDiv.innerHTML =
                '<p class="text-red-600 font-bold">Incorrect! This email exhibits several red flags, including an unprofessional sender address, an urgent and threatening tone, and a generic greeting. Always be skeptical of such emails and verify independently.</p>';
            button.classList.add('incorrect');
        }
        const buttons = document.querySelectorAll('#phishingQuiz .quiz-button');
        buttons.forEach(btn => btn.disabled = true);
    }

    // Knowledge Quiz functions
    let currentQuestion = 1;
    let score = 0;
    let userName = '';
    window.startKnowledgeQuiz = function () {
        userName = document.getElementById('userName').value.trim() || 'User';
        score = 0;
        document.getElementById('knowledgeQuiz').classList.remove('hidden');
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`question${i}`).classList.add('hidden');
            document.getElementById(`question${i}Result`).classList.add('hidden');
            const buttons = document.querySelectorAll(`#question${i} .quiz-button`);
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'incorrect');
            });
        }
        document.getElementById('quizResult').classList.add('hidden');
        document.getElementById('question1').classList.remove('hidden');
        document.getElementById('nextQuestion').classList.add('hidden');
        currentQuestion = 1;
    }

    window.checkKnowledgeAnswer = function (questionId, button, isCorrect) {
        const resultDiv = document.getElementById(`${questionId}Result`);
        resultDiv.classList.remove('hidden');
        if (isCorrect) {
            score += 20; // Each question is worth 20 points
            resultDiv.innerHTML = getCorrectFeedback(questionId);
            button.classList.add('correct');
        } else {
            resultDiv.innerHTML = getIncorrectFeedback(questionId);
            button.classList.add('incorrect');
        }
        const buttons = document.querySelectorAll(`#${questionId} .quiz-button`);
        buttons.forEach(btn => btn.disabled = true);
        if (currentQuestion < 5) {
            document.getElementById('nextQuestion').classList.remove('hidden');
        } else {
            showFinalResults();
        }
    }

    window.showNextQuestion = function () {
        document.getElementById(`question${currentQuestion}`).classList.add('hidden');
        currentQuestion++;
        document.getElementById(`question${currentQuestion}`).classList.remove('hidden');
        document.getElementById('nextQuestion').classList.add('hidden');
    }

    function showFinalResults() {
        const finalScoreDiv = document.getElementById('finalScore');
        const gradeFeedbackDiv = document.getElementById('gradeFeedback');
        const percentage = score;
        let feedback = '';
        if (score >= 80) {
            feedback = `Excellent work, ${userName}! You're a cybersecurity superstar. Keep up your vigilance!`;
        } else if (score >= 60) {
            feedback = `Good job, ${userName}! You have a solid grasp of cybersecurity, but review the material to strengthen your skills.`;
        } else if (score >= 40) {
            feedback = `Nice effort, ${userName}. You're learning, but consider revisiting the sections on phishing and best practices.`;
        } else {
            feedback = `Keep studying, ${userName}! Cybersecurity is tricky, but you're on your way. Review the infographic and try again!`;
        }
        finalScoreDiv.innerHTML = `${userName}, your score: ${score}%`;
        gradeFeedbackDiv.innerHTML = feedback;
        document.getElementById('quizResult').classList.remove('hidden');
    }

    function getCorrectFeedback(questionId) {
        const feedback = {
            'question1': '<p class="text-green-600 font-bold">Correct! Office documents like .docx and .xlsx are the most common for delivering malware because they can hide malicious scripts.</p>',
            'question2': '<p class="text-green-600 font-bold">Well done! Whaling targets senior executives with highly personalized attacks, often posing as CEOs or other high-level figures.</p>',
            'question3': '<p class="text-green-600 font-bold">Great job! Hovering over a link to check the URL is a safe way to verify its legitimacy without clicking.</p>',
            'question4': '<p class="text-green-600 font-bold">Excellent! MFA adds an extra layer of security by requiring additional verification, making it harder for attackers to access accounts.</p>',
            'question5': '<p class="text-green-600 font-bold">Nice work! Urgent language like "Act Now!" is a classic phishing tactic to pressure you into acting without thinking.</p>'
        };
        return feedback[questionId];
    }

    function getIncorrectFeedback(questionId) {
        const feedback = {
            'question1': '<p class="text-red-600 font-bold">Incorrect. Office documents (.docx, .xlsx) are the most common for malware delivery due to their ability to embed malicious code, unlike images or audio files.</p>',
            'question2': '<p class="text-red-600 font-bold">Incorrect. Whaling, not Spear Phishing, specifically focuses on senior executives with targeted attacks to steal sensitive data or funds.</p>',
            'question3': '<p class="text-red-600 font-bold">Incorrect. Never click or reply to suspicious links. Hovering over the link to check the URL is the safest way to verify it.</p>',
            'question4': '<p class="text-red-600 font-bold">Incorrect. MFA enhances security by adding verification steps, not by speeding up logins or managing passwords.</p>',
            'question5': '<p class="text-red-600 font-bold">Incorrect. Urgent language is a key phishing sign, unlike personalized greetings or professional logos, which legitimate emails may also have.</p>'
        };
        return feedback[questionId]; mcdav
    }

    // Scroll progress bar
    const progressBar = document.getElementById('progressFill');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
    function loadLeaderboardData() {
    const data = localStorage.getItem('leaderboardData');
    return data ? JSON.parse(data) : [];
}
function saveLeaderboardData(data) {
    localStorage.setItem('leaderboardData', JSON.stringify(data));
}
function displayLeaderboard() {
    const leaderboardData = loadLeaderboardData();
    leaderboardData.sort((a, b) => b.score - a.score || new Date(b.timestamp) - new Date(a.timestamp));
    const topScores = leaderboardData.slice(0, 5);
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
    topScores.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.className = 'border-t border-gray-300';
        row.innerHTML = `
            <td class="p-2">${index + 1}</td>
            <td class="p-2">${entry.name}</td>
            <td class="p-2">${entry.score}%</td>
            <td class="p-2">${new Date(entry.timestamp).toLocaleDateString()}</td>
        `;
        leaderboardBody.appendChild(row);
    });
    document.getElementById('leaderboard').classList.remove('hidden');
}
function showFinalResults() {
    const finalScoreDiv = document.getElementById('finalScore');
    const gradeFeedbackDiv = document.getElementById('gradeFeedback');
    const percentage = score;
    let feedback = '';
    if (score >= 80) {
        feedback = `Excellent work, ${userName}! You're a cybersecurity superstar. Keep up your vigilance!`;
    } else if (score >= 60) {
        feedback = `Good job, ${userName}! You have a solid grasp of cybersecurity, but review the material to strengthen your skills.`;
    } else if (score >= 40) {
        feedback = `Nice effort, ${userName}. You're learning, but consider revisiting the sections on phishing and best practices.`;
    } else {
        feedback = `Keep studying, ${userName}! Cybersecurity is tricky, but you're on your way. Review the infographic and try again!`;
    }
    finalScoreDiv.innerHTML = `${userName}, your score: ${score}%`;
    gradeFeedbackDiv.innerHTML = feedback;
    const leaderboardData = loadLeaderboardData();
    leaderboardData.push({ name: userName, score: score, timestamp: new Date().toISOString() });
    saveLeaderboardData(leaderboardData);
    document.getElementById('quizResult').classList.remove('hidden');
    displayLeaderboard();
}
});
