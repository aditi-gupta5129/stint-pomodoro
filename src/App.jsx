import { useState, useEffect } from "react";
import "./App.css";
const quotes = [
  "You can sleep when you're dead. — Max Verstappen",
  "If you no longer go for a gap that exists, you're no longer a racing driver. — Ayrton Senna",
  "Still I rise. — Lewis Hamilton",
  "Leave me alone, I know what I'm doing. — Kimi Räikkönen",
  "Keep doubting me, I love it - Max Verstappen",
  "Life is unfair deal with it. — Max Verstappen",
  "It's not about where you start, it's about where you finish. — Max Verstappen",
  "A DNF is better than a DNS",
  "Remember who you are",

];
function App() {
  const [quoteIndex, setQuoteIndex] = useState(0);

const [duration, setDuration] = useState(25);
const [secondsLeft, setSecondsLeft] = useState(25 * 60);
const [isRunning, setIsRunning] = useState(false);
const [mode, setMode] = useState("focus");
const [breakDuration, setBreakDuration] = useState(5);
const [sessionCount, setSessionCount] = useState(4);
const [completedSessions, setCompletedSessions] = useState(0);
const [raceStarted, setRaceStarted] = useState(false);
const [tool, setTool] = useState(null);
const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
const [stopwatchRunning, setStopwatchRunning] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setQuoteIndex((previous) => (previous + 1) % quotes.length);
  }, 8000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setSecondsLeft((previous) => {
      if (previous <= 1) {
        setIsRunning(false);
        return 0;
      }

      return previous - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning]);

useEffect(() => {
  if (tool !== "stopwatch" || !stopwatchRunning) return;

  const interval = setInterval(() => {
    setStopwatchSeconds((previous) => previous + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [tool, stopwatchRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="app">
      <div className="app__shell">
        <header className="app__header">
          <h1 className="app__logo">STINT<span>.</span></h1>
          <p className="app__subtitle">{quotes[quoteIndex]}</p>
        </header>

{tool === null && (
  <section className="panel tool-picker">
    <p className="panel__label">CHOOSE YOUR SESSION</p>
    <h2>How are we racing today?</h2>

    <div className="tool-options">
      <button
        className="tool-option"
        onClick={() => setTool("timer")}
      >
        <span className="tool-icon">⏱</span>
        <strong>Pomodoro Timer</strong>
        <span>Focus stints and pit stops</span>
      </button>

      <button
        className="tool-option"
        onClick={() => setTool("stopwatch")}
      >
        <span className="tool-icon">◷</span>
        <strong>Stopwatch</strong>
        <span>Track an open-ended session</span>
      </button>
    </div>
  </section>
)}

{tool === "stopwatch" && (
  <section className="panel timer-panel">
    <button
      className="back-button"
      onClick={() => {
        setStopwatchRunning(false);
        setTool(null);
      }}
    >
      ← BACK TO SESSION SELECT
    </button>

    <p className="panel__label">OPEN-ENDED SESSION</p>
    <h2>RUN YOUR OWN PACE.</h2>

    <div className="timer">
      {formatTime(stopwatchSeconds)}
    </div>

    <p className="muted">STOPWATCH · ELAPSED TIME</p>

    <div className="timer-actions">
      <button
        className="button button--primary"
        onClick={() => setStopwatchRunning(!stopwatchRunning)}
      >
        {stopwatchRunning
          ? "PAUSE"
          : stopwatchSeconds > 0
            ? "RESUME"
            : "START"}
      </button>

      <button
        className="button button--secondary"
        onClick={() => {
          setStopwatchRunning(false);
          setStopwatchSeconds(0);
        }}
      >
        RESET
      </button>
    </div>
  </section>
)}

        <main className="dashboard">
          
{tool === "timer" && (
  <section className="panel timer-panel">
              {!raceStarted ? (
                <>
                  <button
  className="back-button"
  onClick={() => {
    setIsRunning(false);
    setRaceStarted(false);
    setTool(null);
  }}
>
  ← BACK TO SESSION SELECT
</button>
                  <p className="panel__label">RACE CONFIGURATION</p>
                  <h2>Configure your race.</h2>
                  <p className="muted">Set your pace before the lights go out.</p>

                  <div className="race-settings">
                    <label>
                      FOCUS DURATION (MIN)
                      <input
                        type="number"
                        min="1"
                        max="300"
                        value={duration}
                        onChange={(event) => setDuration(Math.max(1, Number(event.target.value) || 1))} />
                    </label>

                    <label>
                      PIT-STOP DURATION (MIN)
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={breakDuration}
                        onChange={(event) => setBreakDuration(Math.max(1, Number(event.target.value) || 1))} />
                    </label>

                    <label>
                      NUMBER OF FOCUS SESSIONS
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={sessionCount}
                        onChange={(event) => setSessionCount(
                          Math.min(20, Math.max(1, Number(event.target.value) || 1))
                        )} />
                    </label>
                  </div>

                  <button
                    className="button button--primary"
                    onClick={() => {
                      setCompletedSessions(0);
                      setMode("focus");
                      setSecondsLeft(duration * 60);
                      setRaceStarted(true);
                      setIsRunning(true);
                    } }
                  >
                    START GRAND PRIX
                  </button>
                </>
              ) : (
                <><button
  className="back-button"
  onClick={() => {
    setIsRunning(false);
    setRaceStarted(false);
    setTool(null);
  }}
>
  ← BACK TO SESSION SELECT
</button>
                  <p className="panel__label">
                    {mode === "focus" ? "CURRENT SESSION" : "PIT STOP"}
                  </p>
                  <h2>
                    {mode === "focus" ? "FOCUS STINT" : "TAKE A BREATHER"}
                  </h2>

                  <div className="timer">{formatTime(secondsLeft)}</div>

                  <p className="muted">
                    SESSION {Math.min(completedSessions + 1, sessionCount)} OF {sessionCount}
                  </p>

                  <div className="timer-actions">
                    <button
                      className="button button--primary"
                      onClick={() => setIsRunning(!isRunning)}
                    >
                      {isRunning ? "PAUSE" : "RESUME"}
                    </button>

                    <button
                      className="button button--secondary"
                      onClick={() => {
                        setIsRunning(false);
                        setRaceStarted(false);
                      } }
                    >
                      END RACE
                    </button>

                    {mode === "break" && (
                      <button
                        className="button button--secondary"
                        onClick={() => {
                          setMode("focus");
                          setSecondsLeft(duration * 60);
                          setIsRunning(true);
                        } }
                      >
                        SKIP BREAK
                      </button>
                    )}
                  </div>
                </>
              )}
              </section>
)}

            <section className="panel">
                <p className="panel__label">TODAY'S GRAND PRIX</p>
                <p className="muted">
                  Complete tasks to advance through the circuit.
                </p>
                <div className="track-placeholder">
                  <span>START</span>
                  <div className="track-line" />
                  <span>FINISH</span>
                </div>
              </section><section className="panel">
                <p className="panel__label">RACE TELEMETRY</p>
                <div className="stats">
                  <div>
                    <strong>0h 00m</strong>
                    <span>STUDY TIME</span>
                  </div>
                  <div>
                    <strong>0</strong>
                    <span>SESSIONS</span>
                  </div>
                  <div>
                    <strong>0</strong>
                    <span>TASKS DONE</span>
                  </div>
                </div>
              </section><section className="panel">
                <p className="panel__label">TODAY'S PIT WALL</p>
                <h2>Mission checklist</h2>
                <p className="muted">
  Your study tasks will appear here.
</p>
</section>

</main>

        <footer className="app__footer">
          IT'S LIGHTS OUT AND AWAY WE GO.
        </footer>
      </div>
    </div>
  );
}

export default App;
