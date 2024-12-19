import React from "react";

const HomePage = () => {
    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <header className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://th.bing.com/th/id/R.2cbcfbc8f6cdf6abc33930f5c875847e?rik=4sOrlMMsYu%2fy%2bw&pid=ImgRaw&r=0')" }}>
                <div className="h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Bienvenue dans notre espace de coworking</h1>
                    <p className="text-xl">Un environnement inspirant pour votre productivité et collaboration</p>
                </div>
            </header>

            {/* About Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-8">À propos de nous</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-lg leading-relaxed">
                            Notre espace de coworking est conçu pour répondre aux besoins des professionnels modernes, des startups et des équipes en quête d'un environnement de travail collaboratif.
                            Profitez d'une infrastructure moderne, d'une communauté dynamique et de tous les outils nécessaires pour réussir.
                        </p>
                        <ul className="mt-4 list-disc pl-5 space-y-2">
                            <li>Espaces de travail flexibles et modernes</li>
                            <li>Salles de réunion entièrement équipées</li>
                            <li>Connexion Internet haut débit</li>
                            <li>Espaces détentes pour se relaxer et networker</li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src="https://www.tydeck.io/hubfs/engager-communaute-coworkeurs-tydeck.jpg#keepProtocol"
                            alt="Coworking space"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-gray-200 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">Nos Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Salles de réunion",
                                image: "https://media.extron.com/public/img/mktg/nvidia02.jpg",
                                description:
                                    "Des salles équipées pour vos présentations, réunions et conférences.",
                            },
                            {
                                title: "Espaces détente",
                                image: "https://i.pinimg.com/originals/28/cd/c6/28cdc61bfe19996968f7215fbbacef93.jpg",
                                description:
                                    "Relaxez-vous et networkez avec d'autres professionnels.",
                            },
                            {
                                title: "Internet Haut Débit",
                                image: "https://campusnumerique.auvergnerhonealpes.fr/app/uploads/2020/10/sch%C3%A9ma-4Gfixe-scaled.jpg",
                                description:
                                    "Connexion rapide et fiable pour booster votre productivité.",
                            },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="text-center p-4 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                <h3 className="text-xl font-bold mt-4">{service.title}</h3>
                                <p className="mt-2 text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 SR Espace Coworking. Tous droits réservés. </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
