// Kumpulan pertanyaan dan jawaban untuk Mata Pelajaran Matematika
const mathQuestions = [
    {
      question: "Berapakah 2 + 2?",
      answers: [
        { text: "3", correct: false },
        { text: "4", correct: true },
        { text: "5", correct: false },
        { text: "6", correct: false },
      ],
    },
    {
      question: "Apa akar kuadrat dari 25?",
      answers: [
        { text: "4", correct: false },
        { text: "5", correct: true },
        { text: "6", correct: false },
        { text: "7", correct: false },
      ],
    },
    // Tambahkan pertanyaan matematika lainnya di sini...
  ];
  
  // Kumpulan pertanyaan dan jawaban untuk Mata Pelajaran Ilmu Pengetahuan
  const scienceQuestions = [
    {
      question: "Apa simbol kimia untuk air?",
      answers: [
        { text: "H2O", correct: true },
        { text: "O2", correct: false },
        { text: "CO2", correct: false },
        { text: "N2", correct: false },
      ],
    },
    {
      question: "Apa planet terbesar di tata surya kita?",
      answers: [
        { text: "Merkurius", correct: false },
        { text: "Venus", correct: false },
        { text: "Bumi", correct: false },
        { text: "Jupiter", correct: true },
      ],
    },
    // Tambahkan pertanyaan ilmu pengetahuan lainnya di sini...
  ];
  
  // Kumpulan pertanyaan dan jawaban untuk Mata Pelajaran Sejarah
  const historyQuestions = [
    {
      question: "Kapan Perang Dunia II berakhir?",
      answers: [
        { text: "1942", correct: false },
        { text: "1945", correct: true },
        { text: "1950", correct: false },
        { text: "1960", correct: false },
      ],
    },
    {
      question: "Siapa Presiden pertama Amerika Serikat?",
      answers: [
        { text: "George Washington", correct: true },
        { text: "Thomas Jefferson", correct: false },
        { text: "Abraham Lincoln", correct: false },
        { text: "Benjamin Franklin", correct: false },
      ],
    },
    // Tambahkan pertanyaan sejarah lainnya di sini...
  ];
  
  // Fungsi untuk mendapatkan kumpulan pertanyaan berdasarkan mata pelajaran yang dipilih
  function getQuizQuestions(subject) {
    switch (subject) {
      case "math":
        return mathQuestions;
      case "science":
        return scienceQuestions;
      case "history":
        return historyQuestions;
      default:
        return [];
    }
  }
  
  const startQuizButton = document.getElementById('startQuizButton');
  
  startQuizButton.addEventListener('click', function () {
    const subject = document.getElementById('subjectSelect').value;
    startQuiz(subject);
  });
  
  function startQuiz(subject) {
    const questions = getQuizQuestions(subject);
  
    // Tampilkan pertanyaan kuis
    let quizContent = '';
    questions.forEach((question, index) => {
      const questionNumber = index + 1;
      const options = question.answers.map((answer, answerIndex) => {
        const isCorrect = answer.correct ? 'correct' : 'incorrect';
        const feedback = answer.correct ? 'Jawaban Benar!' : 'Jawaban Salah!';
        return `
          <input type="radio" name="q${questionNumber}" value="${answerIndex}" required>
          <label class="${isCorrect}">${answer.text}</label>
          <span class="feedback">${feedback}</span><br>
        `;
      }).join('');
  
      quizContent += `
        <h3>Pertanyaan ${questionNumber}:</h3>
        <p>${question.question}</p>
        ${options}
        <br>
      `;
    });
  
    // Tampilkan tombol "Submit Quiz"
    quizContent += '<button type="submit">Kirim Kuis</button>';
  
    // Tampilkan kuis di halaman
    const quizQuestionsDiv = document.getElementById('quizQuestions');
    quizQuestionsDiv.innerHTML = quizContent;
    quizQuestionsDiv.style.display = 'block';
    const quizResultDiv = document.getElementById('quizResult');
    quizResultDiv.innerHTML = '';
  
    // Gulir ke bagian kuis
    const quizSection = document.getElementById('quiz');
    quizSection.scrollIntoView({ behavior: 'smooth' });
  
    const quizForm = document.getElementById('quizForm');
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const answers = new FormData(e.target);
  
      let score = 0;
      questions.forEach((question, index) => {
        const selectedAnswerIndex = parseInt(answers.get(`q${index + 1}`));
        const selectedAnswer = question.answers[selectedAnswerIndex];
        if (selectedAnswer.correct) {
          score++;
        }
      });
  
      const resultPercentage = (score / questions.length) * 100;
      quizResultDiv.innerHTML = `Hasil Kuis untuk Mata Pelajaran ${subject}: ${score}/${questions.length} (${resultPercentage.toFixed(2)}%)`;
      quizQuestionsDiv.style.display = 'none'; // Sembunyikan pertanyaan kuis setelah pengisian
    });
  }
  