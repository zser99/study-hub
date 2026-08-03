import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import quizzes from '../data/quizzes.js'
import posts from '../data/posts.json'

function QuizPage({ onSubmitScore }) {
  const { series } = useParams()
  const questions = quizzes[series]
  const meta = posts.find((p) => p.series === series)

  const [answers, setAnswers] = useState(() => (questions ? questions.map(() => null) : []))
  const [submitted, setSubmitted] = useState(false)

  if (!questions) {
    return (
      <div className="quiz-page">
        <p>이 시리즈는 아직 쪽지시험이 준비되지 않았습니다.</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    )
  }

  const select = (qIndex, choiceIndex) => {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = choiceIndex
      return next
    })
  }

  const allAnswered = answers.every((a) => a !== null)
  const score = submitted
    ? answers.filter((a, i) => a === questions[i].answerIndex).length
    : 0

  const submit = () => {
    const finalScore = answers.filter((a, i) => a === questions[i].answerIndex).length
    setSubmitted(true)
    onSubmitScore?.(series, finalScore, questions.length)
  }

  const retry = () => {
    setAnswers(questions.map(() => null))
    setSubmitted(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="quiz-page">
      <div className="post-meta">
        <span className="post-series-badge" style={{ '--series-color': meta?.seriesColor }}>
          {meta?.seriesLabel ?? series}
        </span>
        <span className="post-index">쪽지시험 · {questions.length}문제</span>
      </div>

      <h1 className="quiz-title">{meta?.seriesLabel ?? series} 쪽지시험</h1>

      {submitted && (
        <div className="quiz-result">
          <strong>
            {score} / {questions.length}
          </strong>{' '}
          문제를 맞혔습니다.
        </div>
      )}

      {questions.map((q, qIndex) => {
        const selected = answers[qIndex]
        const isCorrect = selected === q.answerIndex
        return (
          <div key={qIndex} className="quiz-question">
            <p className="quiz-question-text">
              {qIndex + 1}. {q.question}
            </p>
            <div className="quiz-choices">
              {q.choices.map((choice, cIndex) => {
                let stateClass = ''
                if (submitted) {
                  if (cIndex === q.answerIndex) stateClass = 'correct'
                  else if (cIndex === selected) stateClass = 'wrong'
                } else if (selected === cIndex) {
                  stateClass = 'selected'
                }
                return (
                  <button
                    key={cIndex}
                    type="button"
                    className={`quiz-choice ${stateClass}`}
                    onClick={() => select(qIndex, cIndex)}
                    disabled={submitted}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>
            {submitted && (
              <p className={`quiz-explanation ${isCorrect ? 'correct' : 'wrong'}`}>
                {isCorrect ? '정답입니다. ' : '오답입니다. '}
                {q.explanation}
              </p>
            )}
          </div>
        )
      })}

      <div className="quiz-actions">
        {!submitted ? (
          <button
            type="button"
            className="quiz-submit"
            disabled={!allAnswered}
            onClick={submit}
          >
            채점하기
          </button>
        ) : (
          <button type="button" className="quiz-submit" onClick={retry}>
            다시 풀기
          </button>
        )}
        <Link to="/" className="quiz-home-link">
          홈으로
        </Link>
      </div>
    </div>
  )
}

export default QuizPage
