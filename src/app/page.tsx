'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { Ornament, Diamond } from '@/components/ornament'
import confetti from 'canvas-confetti'

interface Genre {
  name: string
  description: string
  quote: string
}

const GENRES: Genre[] = [
  {
    name: 'Romance',
    description: 'Histórias de amor e relacionamentos que atravessam fronteiras, épocas e destinos.',
    quote: 'O amor é a força mais sutil do mundo.',
  },
  {
    name: 'Suspense',
    description: 'Tramas repletas de mistério, tensão e reviravoltas que prendem até a última página.',
    quote: 'A verdade raramente é pura e nunca simples.',
  },
  {
    name: 'Comédia',
    description: 'Narrativas leves e bem-humoradas, capazes de iluminar os dias mais sombrios.',
    quote: 'A vida é curta demais para ser levada a sério.',
  },
  {
    name: 'Terror',
    description: 'Histórias sobrenaturais e perturbadoras, que ecoam muito depois do último capítulo.',
    quote: 'O medo é a mais antiga e forte emoção da humanidade.',
  },
  {
    name: 'Fantasia',
    description: 'Mundos mágicos, criaturas fantásticas e narrativas que desafiam a própria imaginação.',
    quote: 'A fantasia é a vida que ainda não foi vivida.',
  },
  {
    name: 'Drama',
    description: 'Narrativas emocionais profundas, reflexivas e humanas, que ecoam a condição de existir.',
    quote: 'Toda vida carrega em si o peso de uma tragédia.',
  },
  {
    name: 'Ação',
    description: 'Aventuras eletrizantes, ritmo acelerado e heróis que enfrentam o impossível.',
    quote: 'A coragem não é a ausência do medo, mas o triunfo sobre ele.',
  },
]

// Single color family — refined earthy tones from light parchment to deep espresso
const SEGMENT_TONES = [
  '#D9C5A8', // 1 — sand
  '#C5A77F', // 2 — clay light
  '#A98553', // 3 — clay
  '#8B6535', // 4 — sienna
  '#6E4D27', // 5 — chestnut
  '#523719', // 6 — coffee
  '#36240F', // 7 — espresso
]
const TEXT_TONES = [
  '#36240F',
  '#36240F',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
]

// Larger wheel for a more immersive experience
const WHEEL_SIZE = 540
const SEGMENT_ANGLE = (Math.PI * 2) / GENRES.length

// Refined earthy palette
const INK = '#2A1A0F'
const INK_SOFT = '#523719'
const PAPER = '#FAF3E5'
const PAPER_DIM = '#EFE3D0'
const GOLD = '#B08746'
const GOLD_BRIGHT = '#D4A55C'
const BORDER = '#D8C5A6'
const ACCENT_LINE = '#8B5733'

interface SpinResult {
  genre: string
  timestamp: Date
}

function drawWheel(
  canvas: HTMLCanvasElement,
  rotation: number,
  dpr: number,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const size = WHEEL_SIZE
  const center = size / 2
  const radius = center - 16

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, size, size)

  // ============ OUTER GOLD RING (metallic) ============
  // Layered radial gradients to simulate brushed gold
  const outerR = radius + 14
  const goldGrad = ctx.createLinearGradient(
    center - outerR, center - outerR,
    center + outerR, center + outerR,
  )
  goldGrad.addColorStop(0, '#8B6535')
  goldGrad.addColorStop(0.25, '#D4A55C')
  goldGrad.addColorStop(0.5, '#F1D89A')
  goldGrad.addColorStop(0.75, '#D4A55C')
  goldGrad.addColorStop(1, '#8B6535')
  ctx.beginPath()
  ctx.arc(center, center, outerR, 0, Math.PI * 2)
  ctx.fillStyle = goldGrad
  ctx.fill()

  // Inner gold hairline
  ctx.beginPath()
  ctx.arc(center, center, radius + 8, 0, Math.PI * 2)
  ctx.strokeStyle = '#5C3D1A'
  ctx.lineWidth = 1
  ctx.stroke()

  // Outer gold hairline
  ctx.beginPath()
  ctx.arc(center, center, outerR + 1, 0, Math.PI * 2)
  ctx.strokeStyle = '#5C3D1A'
  ctx.lineWidth = 1
  ctx.stroke()

  // Tiny decorative dots around the gold ring (book-plate style)
  const dotCount = 56
  for (let i = 0; i < dotCount; i++) {
    const a = (i / dotCount) * Math.PI * 2
    const dr = outerR - 4
    const x = center + Math.cos(a) * dr
    const y = center + Math.sin(a) * dr
    ctx.beginPath()
    ctx.arc(x, y, 0.9, 0, Math.PI * 2)
    ctx.fillStyle = i % 2 === 0 ? '#5C3D1A' : '#D4A55C'
    ctx.fill()
  }

  // ============ SEGMENTS ============
  GENRES.forEach((genre, index) => {
    const startAngle = index * SEGMENT_ANGLE + rotation - Math.PI / 2
    const endAngle = startAngle + SEGMENT_ANGLE

    // Segment fill
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.arc(center, center, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = SEGMENT_TONES[index]
    ctx.fill()

    // Soft radial gradient for depth (within the same hue family)
    const gradient = ctx.createRadialGradient(
      center, center, radius * 0.25,
      center, center, radius,
    )
    gradient.addColorStop(0, 'rgba(255, 248, 235, 0.12)')
    gradient.addColorStop(1, 'rgba(42, 26, 15, 0.22)')
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.arc(center, center, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Thin divider lines between segments (paper-colored hairlines)
    ctx.beginPath()
    ctx.moveTo(center, center)
    ctx.lineTo(
      center + Math.cos(startAngle) * radius,
      center + Math.sin(startAngle) * radius,
    )
    ctx.strokeStyle = 'rgba(250, 243, 229, 0.65)'
    ctx.lineWidth = 1.2
    ctx.stroke()

    // Text label — editorial serif, uppercase, letter-spaced
    // Positioned at ~70% of radius so it sits comfortably between the center
    // medallion and the outer gold ring (no longer "stuck to the center").
    ctx.save()
    ctx.translate(center, center)
    ctx.rotate(startAngle + SEGMENT_ANGLE / 2)
    ctx.textBaseline = 'middle'
    ctx.fillStyle = TEXT_TONES[index]
    ctx.font = '600 19px "Playfair Display", Georgia, serif'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.32)'
    ctx.shadowBlur = 3
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 1

    // Manual letter spacing — refined typographic control, character by character
    const upper = genre.name.toUpperCase()
    const charSpacing = 2
    const widths: number[] = []
    let totalWidth = 0
    for (const ch of upper) {
      const w = ctx.measureText(ch).width
      widths.push(w)
      totalWidth += w
    }
    totalWidth += charSpacing * (upper.length - 1)

    const textCenterRadius = radius * 0.7
    let x = textCenterRadius - totalWidth / 2
    ctx.textAlign = 'left'
    for (let i = 0; i < upper.length; i++) {
      ctx.fillText(upper[i], x, 0)
      x += widths[i] + charSpacing
    }

    // Roman numeral marker — small, near outer edge
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0
    ctx.font = 'italic 11px "Cormorant Garamond", Georgia, serif'
    ctx.fillStyle = TEXT_TONES[index] === '#FFFFFF' ? 'rgba(255,255,255,0.55)' : 'rgba(54,36,15,0.45)'
    ctx.textAlign = 'center'
    ctx.fillText(romanize(index + 1), radius - 18, 0)
    ctx.restore()
  })

  // ============ CENTER MEDALLION ============
  // Outer cream disc with paper-tone shadow
  ctx.beginPath()
  ctx.arc(center, center, 52, 0, Math.PI * 2)
  ctx.fillStyle = '#FAF3E5'
  ctx.shadowColor = 'rgba(42, 26, 15, 0.18)'
  ctx.shadowBlur = 10
  ctx.shadowOffsetY = 2
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0

  // Gold ring around hub
  ctx.beginPath()
  ctx.arc(center, center, 52, 0, Math.PI * 2)
  ctx.strokeStyle = GOLD
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Inner gold ring
  ctx.beginPath()
  ctx.arc(center, center, 44, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(176, 135, 70, 0.5)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Decorative dots around hub
  const hubDots = 24
  for (let i = 0; i < hubDots; i++) {
    const a = (i / hubDots) * Math.PI * 2
    const x = center + Math.cos(a) * 48
    const y = center + Math.sin(a) * 48
    ctx.beginPath()
    ctx.arc(x, y, 0.8, 0, Math.PI * 2)
    ctx.fillStyle = GOLD
    ctx.fill()
  }

  // Center emblem — small ornamental diamond/star
  ctx.fillStyle = GOLD_BRIGHT
  ctx.beginPath()
  ctx.moveTo(center, center - 12)
  ctx.lineTo(center + 8, center)
  ctx.lineTo(center, center + 12)
  ctx.lineTo(center - 8, center)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.arc(center, center, 3, 0, Math.PI * 2)
  ctx.fillStyle = '#5C3D1A'
  ctx.fill()

  ctx.restore()
}

function romanize(n: number): string {
  const map: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let out = ''
  let x = n
  for (const [v, s] of map) {
    while (x >= v) { out += s; x -= v }
  }
  return out
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentResult, setCurrentResult] = useState<Genre | null>(null)
  const [history, setHistory] = useState<SpinResult[]>([])
  const [spinCount, setSpinCount] = useState(0)
  const [pointerKey, setPointerKey] = useState(0)
  const animationRef = useRef<number | null>(null)
  const rotationRef = useRef(0)
  const [wheelScale, setWheelScale] = useState(1)

  // Responsive scaling — fit the wheel into smaller viewports (mobile / tablet)
  useEffect(() => {
    const update = () => {
      const available = Math.min(window.innerWidth - 32, WHEEL_SIZE)
      setWheelScale(Math.min(1, available / WHEEL_SIZE))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Setup canvas with device pixel ratio for crisp rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = WHEEL_SIZE * dpr
    canvas.height = WHEEL_SIZE * dpr
    canvas.style.width = `${WHEEL_SIZE}px`
    canvas.style.height = `${WHEEL_SIZE}px`
    drawWheel(canvas, rotationRef.current, dpr)
  }, [])

  // Redraw on rotation change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    drawWheel(canvas, rotation, dpr)
  }, [rotation])

  const fireConfetti = (tone: string) => {
    const colors = [tone, GOLD_BRIGHT, '#FAF3E5', ACCENT_LINE]
    // Burst from center top
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.45 },
      colors,
      scalar: 0.9,
      gravity: 0.9,
      ticks: 220,
      shapes: ['square'],
    })
    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.55 },
        colors,
        scalar: 0.8,
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.55 },
        colors,
        scalar: 0.8,
      })
    }, 200)
    // Falling petals
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0 },
        colors,
        scalar: 0.7,
        gravity: 0.5,
        ticks: 280,
        shapes: ['circle'],
      })
    }, 400)
  }

  const spin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setCurrentResult(null)

    const minSpins = 5
    const maxSpins = 8
    const fullRotations = minSpins + Math.random() * (maxSpins - minSpins)
    const randomOffset = Math.random() * Math.PI * 2
    const startRotation = rotationRef.current
    const targetRotation = startRotation + fullRotations * Math.PI * 2 + randomOffset
    const duration = 5200
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const currentRotation = startRotation + (targetRotation - startRotation) * eased

      rotationRef.current = currentRotation
      setRotation(currentRotation)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // ====== CORRECT SEGMENT DETECTION ======
        // The pointer is at the top of the wheel, i.e. canvas angle = -π/2.
        // Segment i is drawn starting at angle (i*SEG + R - π/2) and spans SEG
        // clockwise. The pointer is INSIDE segment i when:
        //   i*SEG + R ≤ 0 < (i+1)*SEG + R   (mod 2π)
        // ⟺  i*SEG ≤ -R < (i+1)*SEG        (mod 2π)
        // So: take negR = (-R) mod 2π (in [0, 2π)), then segmentIndex = floor(negR / SEG).
        // NOTE: a previous version subtracted SEG/2 here, which caused the
        // pointer's segment to be reported as the previous one whenever the
        // pointer landed in the first half of a segment (e.g. visually on
        // "Fantasia" but counted as "Terror"). Removed.
        const negRotation =
          ((-currentRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const segmentIndex =
          Math.floor(negRotation / SEGMENT_ANGLE) % GENRES.length
        const finalIndex =
          ((segmentIndex % GENRES.length) + GENRES.length) % GENRES.length

        const selected = GENRES[finalIndex]
        setCurrentResult(selected)
        setHistory((prev) => [
          { genre: selected.name, timestamp: new Date() },
          ...prev.slice(0, 9),
        ])
        setSpinCount((c) => c + 1)
        setIsSpinning(false)
        // Trigger pointer drop animation
        setPointerKey((k) => k + 1)
        // Fire confetti using the segment tone
        setTimeout(() => fireConfetti(SEGMENT_TONES[finalIndex]), 150)
        toast({
          title: selected.name,
          description: selected.quote,
        })
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const toneFor = (name: string) => {
    const idx = GENRES.findIndex((g) => g.name === name)
    return SEGMENT_TONES[idx] ?? ACCENT_LINE
  }

  // Helper to render animated letters
  const renderSpacedName = (name: string) => {
    return name.split('').map((ch, i) => (
      <span key={i} style={{ animationDelay: `${i * 0.04}s` }}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ))
  }

  return (
    <div
      className="min-h-screen flex flex-col paper-texture paper-grain"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* ============ HEADER ============ */}
      <header className="w-full pt-12 pb-8 px-4 text-center fade-up">
        <p
          className="text-[11px] uppercase tracking-[0.5em] mb-4"
          style={{ color: GOLD, fontFamily: 'var(--font-inter), sans-serif' }}
        >
          ✦ Biblioteca da Fortuna ✦
        </p>
        <Ornament className="mx-auto mb-4" color={ACCENT_LINE} />
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            color: INK,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          Roleta da Sorte Literária
        </h1>
        <p
          className="mt-5 text-sm sm:text-base max-w-xl mx-auto leading-relaxed italic"
          style={{
            color: INK_SOFT,
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '1.1rem',
          }}
        >
          Gire e deixe que o destino escolha o gênero de sua próxima jornada entre as páginas.
        </p>
        <Ornament className="mx-auto mt-5" color={ACCENT_LINE} />
      </header>

      {/* ============ MAIN ============ */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <div className="grid xl:grid-cols-[auto_1fr] gap-12 items-start max-w-6xl w-full">
          {/* ===== Wheel column ===== */}
          <div className="flex flex-col items-center gap-8 mx-auto fade-up fade-up-delay-1">
            {/* Wheel container — wrapped in scaling div for responsive sizing */}
            <div
              style={{
                width: WHEEL_SIZE * wheelScale,
                height: WHEEL_SIZE * wheelScale,
              }}
            >
              <div
                className="relative"
                style={{
                  width: WHEEL_SIZE,
                  height: WHEEL_SIZE,
                  transform: `scale(${wheelScale})`,
                  transformOrigin: 'top left',
                }}
              >
                {/* Decorative outer glow */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: `0 0 60px rgba(139, 87, 51, 0.18), 0 30px 60px rgba(42, 26, 15, 0.15)`,
                  }}
                />

                {/* Pointer — refined, ink-colored, with drop animation */}
                <div
                  key={pointerKey}
                  className={`absolute left-1/2 -translate-x-1/2 -top-2 z-30 ${pointerKey > 0 ? 'pointer-drop' : ''}`}
                  style={{ filter: 'drop-shadow(0 3px 4px rgba(42,26,15,0.3))' }}
                  aria-hidden="true"
                >
                  <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14 36 L2 8 Q14 0 26 8 Z"
                      fill={INK}
                    />
                    <path
                      d="M14 36 L2 8 Q14 0 26 8 Z"
                      fill="url(#pointerGrad)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="pointerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#000000" />
                      </linearGradient>
                    </defs>
                    {/* Gold band at top */}
                    <rect x="2" y="6" width="24" height="2" fill={GOLD_BRIGHT} />
                  </svg>
                </div>

                {/* The canvas wheel */}
                <canvas
                  ref={canvasRef}
                  className={`block ${!isSpinning ? 'wheel-breathe' : ''}`}
                  style={{
                    filter: 'drop-shadow(0 12px 28px rgba(42,26,15,0.15))',
                  }}
                  aria-label="Roleta da sorte com sete gêneros literários"
                />
              </div>
            </div>

            {/* Spin button — refined editorial style */}
            <div className="flex flex-col items-center gap-3 fade-up fade-up-delay-2">
              <Button
                onClick={spin}
                disabled={isSpinning}
                size="lg"
                className="font-medium text-sm px-14 py-7 rounded-none shadow-none border-2 tracking-[0.3em] uppercase transition-all duration-300 relative overflow-hidden group"
                style={{
                  backgroundColor: isSpinning ? PAPER_DIM : INK,
                  color: PAPER,
                  borderColor: isSpinning ? BORDER : INK,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {isSpinning ? (
                  <span className="flex items-center gap-3">
                    <span
                      className="inline-block w-3 h-3 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: 'rgba(250,243,229,0.25)',
                        borderTopColor: PAPER,
                      }}
                    />
                    Girando
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Diamond color={GOLD_BRIGHT} />
                    Girar a Roleta
                    <Diamond color={GOLD_BRIGHT} />
                  </span>
                )}
              </Button>
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{
                  color: GOLD,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                {spinCount === 0
                  ? 'Pronto para começar'
                  : `${spinCount} ${spinCount === 1 ? 'giro' : 'giros'} realizados`}
              </p>
            </div>
          </div>

          {/* ===== Side panel ===== */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            {/* ===== Result card ===== */}
            <div
              className="relative p-8 shadow-none border fade-up fade-up-delay-2"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: BORDER,
                borderWidth: 1,
              }}
              aria-live="polite"
            >
              {/* Corner ornaments */}
              <svg className="absolute top-2 left-2" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 2 L2 12 M2 2 L12 2" stroke={GOLD} strokeWidth="0.8" opacity="0.6"/>
                <circle cx="2" cy="2" r="1.2" fill={GOLD} opacity="0.7"/>
              </svg>
              <svg className="absolute top-2 right-2 rotate-90" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 2 L2 12 M2 2 L12 2" stroke={GOLD} strokeWidth="0.8" opacity="0.6"/>
                <circle cx="2" cy="2" r="1.2" fill={GOLD} opacity="0.7"/>
              </svg>
              <svg className="absolute bottom-2 left-2 -rotate-90" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 2 L2 12 M2 2 L12 2" stroke={GOLD} strokeWidth="0.8" opacity="0.6"/>
                <circle cx="2" cy="2" r="1.2" fill={GOLD} opacity="0.7"/>
              </svg>
              <svg className="absolute bottom-2 right-2 rotate-180" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M2 2 L2 12 M2 2 L12 2" stroke={GOLD} strokeWidth="0.8" opacity="0.6"/>
                <circle cx="2" cy="2" r="1.2" fill={GOLD} opacity="0.7"/>
              </svg>

              <p
                className="text-[10px] uppercase tracking-[0.4em] mb-5 text-center"
                style={{
                  color: GOLD,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                ✦ Resultado ✦
              </p>

              {currentResult ? (
                <div key={currentResult.name} className="space-y-4 result-reveal">
                  {/* Gold shimmer line */}
                  <div
                    className="h-px mx-auto gold-shimmer"
                    style={{ maxWidth: '80px' }}
                  />

                  <h2
                    className="text-5xl font-normal text-center letter-drop"
                    style={{
                      color: INK,
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {renderSpacedName(currentResult.name)}
                  </h2>

                  <p
                    className="text-center italic text-base leading-relaxed"
                    style={{
                      color: INK_SOFT,
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                    }}
                  >
                    “{currentResult.quote}”
                  </p>

                  <Ornament className="mx-auto" color={ACCENT_LINE} />

                  <p
                    className="text-sm text-center leading-relaxed pt-2"
                    style={{
                      color: INK_SOFT,
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                  >
                    {currentResult.description}
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center" style={{ color: '#9C836A' }}>
                  <Ornament className="mx-auto mb-4" color={BORDER} />
                  <p
                    className="text-base italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                    }}
                  >
                    Gire a roleta e descubra
                    <br />
                    qual história o destino reservou.
                  </p>
                  <Ornament className="mx-auto mt-4" color={BORDER} />
                </div>
              )}
            </div>

            {/* ===== Genre legend ===== */}
            <div
              className="p-6 border fade-up fade-up-delay-3"
              style={{ borderColor: BORDER, backgroundColor: 'rgba(255,255,255,0.4)' }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.4em] mb-4 text-center"
                style={{
                  color: GOLD,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                ✦ Gêneros ✦
              </p>
              <Ornament className="mx-auto mb-4" color={BORDER} />
              <ul className="space-y-0">
                {GENRES.map((g, i) => (
                  <li
                    key={g.name}
                    className="flex items-center justify-between py-2.5 text-sm group transition-colors hover:bg-white/40"
                    style={{ borderBottom: `1px solid ${PAPER_DIM}` }}
                  >
                    <span
                      className="flex items-center gap-3"
                      style={{
                        color: INK,
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                      }}
                    >
                      <span
                        className="inline-block w-2.5 h-2.5"
                        style={{ backgroundColor: SEGMENT_TONES[i] }}
                      />
                      <span className="font-medium">{g.name}</span>
                    </span>
                    <span
                      className="text-xs tabular-nums italic"
                      style={{
                        color: GOLD,
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                      }}
                    >
                      {romanize(i + 1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== History ===== */}
            {history.length > 0 && (
              <div
                className="p-6 border fade-up fade-up-delay-4"
                style={{ borderColor: BORDER, backgroundColor: 'rgba(255,255,255,0.4)' }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.4em] mb-4 text-center"
                  style={{
                    color: GOLD,
                    fontFamily: 'var(--font-inter), sans-serif',
                  }}
                >
                  ✦ Histórico ✦
                </p>
                <Ornament className="mx-auto mb-4" color={BORDER} />
                <div className="space-y-0 max-h-72 overflow-y-auto pr-2 literary-scroll">
                  {history.map((h, i) => (
                    <div
                      key={`${h.timestamp.getTime()}-${i}`}
                      className="flex items-center justify-between gap-2 py-2.5 text-sm"
                      style={{ borderBottom: `1px solid ${PAPER_DIM}` }}
                    >
                      <span
                        className="flex items-center gap-3"
                        style={{
                          color: INK,
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                        }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: toneFor(h.genre) }}
                        />
                        <span className="font-medium">{h.genre}</span>
                      </span>
                      <span
                        className="text-xs tabular-nums"
                        style={{
                          color: '#9C836A',
                          fontFamily: 'var(--font-inter), sans-serif',
                        }}
                      >
                        {h.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <footer
        className="mt-auto pt-8 pb-10 px-4 text-center"
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: 'rgba(250, 243, 229, 0.6)',
        }}
      >
        <Ornament className="mx-auto mb-3" color={GOLD} />
        <p
          className="text-[11px] uppercase tracking-[0.4em] mb-2"
          style={{
            color: GOLD,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Roleta da Sorte Literária
        </p>
        <p
          className="text-xs italic"
          style={{
            color: '#9C836A',
            fontFamily: 'var(--font-cormorant), Georgia, serif',
          }}
        >
          Para os que ainda acreditam no poder de uma boa história.
        </p>
      </footer>
    </div>
  )
}
