'use client'

import { useEffect, useState } from 'react'

const KEY = 'apos_track_disabled'

type DntSource = {
  doNotTrack?: string | boolean | null
  msDoNotTrack?: string | null
}

function detectDnt(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as DntSource
  const win = (typeof window !== 'undefined' ? window : {}) as DntSource
  const raw = nav.doNotTrack ?? win.doNotTrack ?? nav.msDoNotTrack
  return raw === '1' || raw === 'yes' || raw === true
}

export default function TrackingOptOut() {
  const [disabled, setDisabled] = useState<boolean | null>(null)
  const [dnt, setDnt] = useState(false)

  useEffect(() => {
    setDnt(detectDnt())
    try {
      setDisabled(localStorage.getItem(KEY) === '1')
    } catch {
      setDisabled(false)
    }
  }, [])

  if (disabled === null) return null

  function toggle() {
    try {
      if (disabled) {
        localStorage.removeItem(KEY)
        setDisabled(false)
      } else {
        localStorage.setItem(KEY, '1')
        setDisabled(true)
      }
    } catch {
      /* localStorage unavailable — ignore */
    }
  }

  const effectivelyOff = dnt || disabled

  return (
    <div>
      <p className="text-[0.9rem] text-ink-light leading-relaxed mb-3 m-0">
        Aktueller Status:{' '}
        <strong className={effectivelyOff ? 'text-[#4A7C4E]' : 'text-ink'}>
          {effectivelyOff ? 'Tracking auf dieser Seite deaktiviert' : 'Tracking aktiv'}
        </strong>
        {dnt && (
          <span className="text-[0.82rem] text-ink-muted block mt-1">
            Ihr Browser sendet einen Do-Not-Track-Header &mdash; das Tracking ist bereits automatisch
            deaktiviert.
          </span>
        )}
      </p>
      {!dnt && (
        <button
          type="button"
          onClick={toggle}
          className="inline-block px-4 py-2 rounded-md border border-border bg-white text-[0.9rem] font-semibold text-ink hover:bg-cream-dark transition-colors"
        >
          {disabled ? 'Tracking wieder aktivieren' : 'Tracking auf dieser Seite deaktivieren'}
        </button>
      )}
    </div>
  )
}
