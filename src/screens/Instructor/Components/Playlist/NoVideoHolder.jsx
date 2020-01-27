import React from 'react'

function NoVideoHolder({ type }) {
  return type === 2 ? (
    <div className="ct-d-r-center w-100">
      <div className="mt-5 text-muted">
        NO VIDEO
      </div>
    </div>
  ) : (
    <div className="ct-d-c-center w-100">
      <div className="mt-5">
        <div className="sk-wave">
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
          <div className="sk-wave-rect"></div>
        </div>
      </div>
      <div className="mt-5 text-muted text-center">
        YOUR VIDEOS WILL BE AVAILABLE SOON. <br/>
      </div>
      <div className="mt-2 text-muted text-center">
        HAVING QUESTIONS? <a href="mailto:classtranscribe@illinois.edu">CONTACT US</a>
      </div>
    </div>
  )
}

export default NoVideoHolder