import React from 'react'
import { WorkFlow } from '../../components/user/WorkFlow'
import { useNavigate } from 'react-router-dom'

export const Homepage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signup')
  }

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://ideogram.ai/assets/progressive-image/balanced/response/Upnn1ZkhTqmvvu2WPXJvfg)',
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-4 text-5xl font-bold italic font-serif text-black">
              Ready to Roam?
            </h1>
            <p className="mb-5 text-xl font-serif text- font-semibold">
              Rent a car effortlessly and embark on unforgettable adventures.
              <br />
              Let the open road be your playground
            </p>
            <button className="btn glass" onClick={handleClick}>
              TakeaDrive
            </button>
          </div>
        </div>
      </div>
      <WorkFlow />
    </div>
  )
}
