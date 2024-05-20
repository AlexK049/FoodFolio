import React, { useEffect, useState } from 'react';
import mainLogo from '../static/images/pretzel-logo.png'

const RotatingText = ({ className }) => {
    const bonAppetitTranslations = [
        { language: "French", translation: "Bon Appétit" },
        { language: "Spanish", translation: "Buen Provecho" },
        { language: "Italian", translation: "Buon Appetito" },
        { language: "German", translation: "Guten Appetit" },
        { language: "Portuguese", translation: "Bom Apetite" },
        { language: "Dutch", translation: "Eet Smakelijk" },
        { language: "Russian", translation: "Приятного аппетита (Priyatnogo Appetita)" },
        { language: "Chinese (Simplified)", translation: "请慢用 (Qǐng màn yòng)" },
        { language: "Japanese", translation: "いただきます (Itadakimasu)" },
        { language: "Korean", translation: "맛있게 드세요 (Mas-issge Deuseyo)" },
        { language: "Greek", translation: "Καλή Όρεξη (Kalí Órexi)" },
        { language: "Turkish", translation: "Afiyet Olsun" },
        { language: "Arabic", translation: "بالهناء والشفاء (Bil-hanā' wa sh-shifā')" },
        { language: "Hebrew", translation: "בתיאבון (Beteavon)" },
        { language: "Swedish", translation: "Smaklig Måltid" },
        { language: "Danish", translation: "Velbekomme" },
        { language: "Norwegian", translation: "Velbekomme" },
        { language: "Finnish", translation: "Hyvää Ruokahalua" },
        { language: "Polish", translation: "Smacznego" },
        { language: "Czech", translation: "Dobrou Chuť" },
        { language: "Hungarian", translation: "Jó Étvágyat" },
        { language: "Romanian", translation: "Poftă Bună" },
        { language: "Vietnamese", translation: "Chúc Ngon Miệng" },
        { language: "Thai", translation: "ขอให้เจริญอาหาร (K̄hx h̄ı c̄hærỵ xāh̄ār)" },
        { language: "Hindi", translation: "भोजन का आनंद लें (Bhojan ka aanand lein)" },
        { language: "Swahili", translation: "Karibu Chakula" },
        { language: "Indonesian", translation: "Selamat Makan" },
        { language: "Filipino/Tagalog", translation: "Kain Tayo" }
    ];

    const [index, setIndex] = useState(0);
    useEffect(() => {
        let rotationCount = 0
        const intervalId = setInterval(() => {
            setIndex(prevIndex => {
                if (++rotationCount % 5 == 0) {
                    return 0;
                } else {
                    let newIndex = prevIndex;
                    while (newIndex === prevIndex) {
                        //min: 1 (index 0 will be used automatically every 5). max: arr.length - 1
                        newIndex = Math.floor(Math.random() * (bonAppetitTranslations.length - 1)) + 1;
                    }
                    return newIndex;
                }
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [className]);

    return (
        <div className={className}>{bonAppetitTranslations[index]?.translation}</div>
    );
}

const AuthPage = ({ children }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-zinc-100">
            <div className="w-full md:w-3/4 md:flex lg:w-2/3 gap-5 p-2 bg-zinc-50 rounded-2xl overflow-hidden shadow-lg border-2">
                {children}
                <div className="md:w-1/2 flex flex-col justify-center items-center">
                    <img src={mainLogo} alt="logo" className="md:h-4/5 object-contain hidden md:block" />
                    <RotatingText className="font-bold text-orange-300 hidden md:block" />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
