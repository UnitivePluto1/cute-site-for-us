import { useState } from "react"

function Valentines() {
    const [step, setStep] = useState(1)

    return (
        <div className="valentine-page">
            {/* Background Polaroid Strips */}
            <div className="valentine-background">
                <div className="strip strip-1">
                    <img src="/public/photos/photo2.jpg" />

                    <img src="/public/photos/photo9.jpg" />
                    <img src="/public/photos/photo6.jpg" />
                </div>

                <div className="strip strip-2">
                    <img src="/public/photos/photo4.jpg" />
                    <img src="/public/photos/photo13.jpg" />

                </div>

                <div className="strip strip-3">
                    <img src="/public/photos/photo7.jpg" />
                    <img src="/public/photos/photo8.jpg" />
                    <img src="/public/photos/photo3.jpg" />
                </div>

                <div className="strip strip-4">
                    <img src="/public/photos/photo10.jpg" />
                    <img src="/public/photos/photo11.jpg" />
                    <img src="/public/photos/photo12.jpg" />
                </div>

                <div className="strip strip-5">
                    <img src="/public/photos/photo5.jpg" />

                    <img src="/public/photos/photo14.jpg" />
                </div>
            </div>
            <div className="valentine-content">
                {step === 1 && <ApologyStep setStep={setStep} />}
                {step === 2 && <SecondStep setStep={setStep} />}
                {step === 3 && <FinalStep />}
            </div>
        </div>
    )
}

/* ------------------ STEP 1 ------------------ */

function ApologyStep({ setStep }: { setStep: (n: number) => void }) {
    const [noCount, setNoCount] = useState(0)
    const [noPosition, setNoPosition] = useState<{ top?: string; left?: string }>({})
    const [message, setMessage] = useState("Do you forgive me?")

    const messages = [
        "maaf nahi karoge?",
        "aisa mt karo :(",
        "Kardo na maaf :(((",
        "itna mood kharab krdia kya maine??",
        "are baba maaan jaaaaoooooo plsss",
        "abey oh, yes press kar.",
        "KAR NAA!",
        "okay iske baad nahi manaunga okay? :P",
        "OKAY ISKE BAAD NAHI, AB MAAN JAO FINALLY.",
        "abey oh pagal ladki, shaanti se yes daba.",
        "jhaapad khaane wali harkate.",
        "okay bye ab hmph,"
    ]

    const handleNoClick = () => {
        const newCount = noCount + 1
        setNoCount(newCount)

        if (newCount <= messages.length) {
            setMessage(messages[newCount - 1])
        }

        // Move button after first click
        const top = Math.random() * 400
        const left = Math.random() * 400
        setNoPosition({
            top: `${top}%`,
            left: `${left}%`
        })

        // Logout after 12th click
        if (newCount === 12) {
            setTimeout(() => {
                window.location.href = "/"
            }, 3000)
        }
    }

    return (
        <>
        <h1>I’m so sorry for delaying this 💛</h1>
            <p>{message}</p>

            <div style={{ marginTop: "2rem", position: "relative" }}>
                <button
                    className="val-btn yes-btn"
                    onClick={() => setStep(2)}
                >
                    Yes
                </button>

                <button
                    className="val-btn"
                    onClick={handleNoClick}
                    style={
                        noCount === 0
                            ? { marginLeft: "20px" } // beside Yes initially
                            : {
                                position: "absolute",
                                top: noPosition.top,
                                left: noPosition.left
                                }
                    }
                >
                    No
                </button>
            </div>
                        </>
    )
}

/* ------------------ STEP 2 ------------------ */

function SecondStep({ setStep }: { setStep: (n: number) => void }) {
    const [noPosition, setNoPosition] = useState<{ top?: string; left?: string }>({})
    const [moved, setMoved] = useState(false)
    const [noCount, setNoCount] = useState(0)
    const [subtitle, setSubtitle] = useState("")

    const messages = [
        "Firse nautanki?",
        "matlab ye sab mazaak lg rha hai tumhe",
        "chup chaap yes daba wrna maar khaegi.",
        "kya chahiye tujhe yes bolne ke lie hain?",
        "abey oh, dramebaaz.. shanti se yes daba",
        "jhaapad khaane wali harkat.",
        "nahi pasand hu kya mai?",
        "tu na bhaad mei ja ab.",
        "ab MAI GUSSA HU",
        "pls?",
        "pls pls?",
        "pls pls pls?",
        "pls pls pls pls?",
        "pls pls pls pls pls?",
        "pls pls pls pls pls pls?",
        "pls pls pls pls pls pls pls?",
        "pls pls pls pls pls pls pls pls?",
        "PLEASE PLEASEPLEASEPALFSKAPOFKAWPOKSO???",
        "PLEAAAAAAAAAAAAAAAAAAASSEEEEEEE????",
        "bhagwaan mai akela hi marunga kya",
        "HAATH JOD KE PLEASE ;-;",
        "literally ON THE FLOOR😭",
        "madamji, ab mai thak gya hu.. 🥲",
        "lagta hai mai pyaar ke lie bana hi nahi tha 😞"
    ]

    const moveNo = () => {
        const newCount = noCount + 1
        setNoCount(newCount)

        if (newCount <= messages.length) {
            setSubtitle(messages[newCount - 1])
        }

        setMoved(true)

        const top = Math.random() * 400
        const left = Math.random() * 400

        setNoPosition({
            top: `${top}%`,
            left: `${left}%`
        })
    }

    return (
        <>
            <h1>Would you still like to be my Valentine? 💖</h1>

            {subtitle && (
                <p style={{ marginTop: "0.8rem", opacity: 0.9 }}>
                    {subtitle}
                </p>
            )}

            <div style={{ marginTop: "2rem", position: "relative" }}>
                <button
                    className="val-btn yes-btn"
                    onClick={() => setStep(3)}
                >
                    Yes 💕
                </button>

                <button
                    className="val-btn"
                    onClick={moveNo}
                    style={
                        !moved
                            ? { marginLeft: "20px" }
                            : {
                                position: "absolute",
                                top: noPosition.top,
                                left: noPosition.left
                            }
                    }
                >
                    No
                </button>
            </div>
        </>
    )
}

/* ------------------ STEP 3 ------------------ */
function FinalStep() {
    return (
        <>
            {/* Back Button */}
            <button
                className="back-btn"
                onClick={() => window.location.href = "/menu"}
            >
                ← Back to Menu
            </button>

            <img
                src="https://media.tenor.com/6dBdEsXHESAAAAAj/kiss.gif"
                alt="cute gif1"
                className="side-gif1"
            />
            <img
                src="https://media.tenor.com/Tb5oi-FdAg0AAAAi/fofo-cute.gif"
                alt="cute gif2"
                className="side-gif2"
            />
            <img
                src="https://media1.tenor.com/m/EMpzIOdPR4sAAAAC/nanobombs-cat.gif"
                alt="cute gif3"
                className="side-gif3"
            />
            <img
                src="https://media.tenor.com/Y2SbeMmjNE4AAAAi/smug-smug-idiot.gif"
                alt="cute gif4"
                className="side-gif4"
            />
            <img
                src="https://media.tenor.com/ZFoPuGP8CRQAAAAi/flattered-blissful.gif"
                alt="cute gif5"
                className="side-gif5"
            />
            <img
                src="https://media.tenor.com/lGdck5vg7CYAAAAi/pisica-cat.gif"
                alt="cute gif6"
                className="side-gif6"
            />

            <div className="final-container">
                <div className="final-card">

                    <h1 className="final-title">
                        She said YES 💕✨
                    </h1>

                    <div className="proposal-letter">
                        <p>
                            To - My valentine!!!!!!!! this is rlly rlly late aha :D.
                            oopsie 👉👈
                        </p>

                        <p>
                            Now i know what you must be thinking. ye banda kitna cringe hai uffo... 
                            TO KYA KARLOGE HAIN? CHOOSE MUJHE HI KIA HAI TUMNE.
                            CHUP CHAAP baitho and deal with it hmph.
                        </p>

                        <p>
                            And ohohoh,  this was supposed to be a proposal at first but now it is something to tell you thaaatt,, i miss you and i adore you soooooooo much. you are literally the most angelic and the nicest person i've met.
                        </p>

                        <p>
                            even though ofcourse the most angelic person pulled whatever shit she pullled yesterday smh. i forgive you and hopefully it doesnt bother us in the future.
                            you are mine, only mine. ye baat dimaag mei baitha ke rkh lo tum.
                        </p>

                        <p>
                            and since this was supposed to be sent on the day,, yk the VALENTINES day,, my request was going to include nasty time but alas. no MORE NASTY. suffer.
                        </p>

                        
                        <p>
                            I wanted to make this because, we cant give each other letters ab now can we? well yes but it is quite difficult. so this is an archive for our letters, our memories and just some special things if i feel like doing something for u hehehe. try to update it if you feel like it. let me know if i need to give you permissions to add something too heheh. AND OH GIVE ME SUGGESTIONS

                        </p>
                        <p>
                            p.s. I just wanna say - i find this gift giving thing to be super stressful
                            cuz i am so bad at doing smthn special 😭. but since i managed to pull this off, which i hope i do and i rlly rlly hope you like it.... here is our own archive :). our own cute si website that i hope will stay up for as long as we want it to.

                        </p>
                        <p>
                            from - someone who hates you like crazy. CRAZY hatred i tell you ~ heheh
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Valentines