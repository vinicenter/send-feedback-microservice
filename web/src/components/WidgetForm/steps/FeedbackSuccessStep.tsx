import { CloseButton } from "../../CloseButton";
import OtherImageUrl from '../../../assets/other.svg';

interface FeedbackSuccessStepProps {
    onFeedbackRestart: () => void;
}

export function FeedbackSuccessStep({ onFeedbackRestart } : FeedbackSuccessStepProps) {
    return (
        <>
            <header>
                <CloseButton />
            </header>

            <div className="flex flex-col items-center py-10 w-[304px]">
                <img src={OtherImageUrl} alt="" className="w-20 h-20" />
                <span className="text-xl mt-8">
                    Agradecemos o feedback!
                </span>

                <button
                    onClick={onFeedbackRestart}
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors duration-200 focus:ring-1 focus:ring-brand-500 focus:outline-none"
                >
                    Quero enviar outro 
                </button>
            </div>
        </>
    )
}