import { useState } from "react";

import BugImageUrl from '../../assets/bug.svg';
import IdeaImageUrl from '../../assets/idea.svg';
import OtherImageUrl from '../../assets/other.svg';
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG: {
        label: "Problema",
        Image: {
            src: BugImageUrl,
            alt: "Image de um inseto",
        },
    },
    IDEA: {
        label: "Ideia",
        Image: {
            src: IdeaImageUrl,
            alt: "Image de uma lâmpada",
        },
    },
    OTHER: {
        label: "Outro",
        Image: {
            src: OtherImageUrl,
            alt: "Image de um balão de pensamento",
        },
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>();
    const [feedbackSent, setFeedbackSend] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSend(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl md-4 flex flex-col w-[calc(100vw-2rem)] md:w-auto items-center shadow-lg">
            { feedbackSent ? (
                <FeedbackSuccessStep
                    onFeedbackRestart={handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestart={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSend(true)}
                        />
                    )}
                </>
            )}

            <footer>   
                Feito com amor por <a className="underline underline-offset-1" href="https://vini.center" target="_blank">vini.center</a>
            </footer>
        </div>
    )
}