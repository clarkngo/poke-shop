import { STEP_ORDER, STEP_LABELS, type BuilderStep } from "../types";

interface Props {
  current: BuilderStep;
  onJump: (step: BuilderStep) => void;
  canJump: (step: BuilderStep) => boolean;
}

export default function StepIndicator({ current, onJump, canJump }: Props) {
  const currentIdx = STEP_ORDER.indexOf(current);

  return (
    <nav className="flex items-center justify-center gap-1 mb-8">
      {STEP_ORDER.map((step, i) => {
        const isActive = step === current;
        const isDone = i < currentIdx;
        const jumpable = canJump(step);

        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => jumpable && onJump(step)}
              disabled={!jumpable}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all
                ${isActive ? "bg-ocean text-white shadow-md scale-105" : ""}
                ${isDone ? "bg-seafoam/20 text-ocean cursor-pointer hover:bg-seafoam/30" : ""}
                ${!isActive && !isDone ? "bg-gray-100 text-gray-400" : ""}
                ${jumpable && !isActive ? "cursor-pointer" : ""}
                ${!jumpable ? "cursor-default" : ""}
              `}
            >
              <span
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${isActive ? "bg-white text-ocean" : ""}
                  ${isDone ? "bg-seafoam text-white" : ""}
                  ${!isActive && !isDone ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {isDone ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{STEP_LABELS[step]}</span>
            </button>
            {i < STEP_ORDER.length - 1 && (
              <div className={`w-6 h-0.5 mx-1 ${i < currentIdx ? "bg-seafoam" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
