
import Image from 'next/image';

const seals = [
    { name: 'SSL Secure', imageUrl: 'https://raspagreen.com/selo-ssl.png' },
    { name: '24/7 Support', imageUrl: 'https://raspagreen.com/selo-24-7.png' },
    { name: 'Pix', imageUrl: 'https://raspagreen.com/selo-pix.png' },
    { name: '18+', imageUrl: 'https://raspagreen.com/selo-18.png' },
    { name: 'Fair Play', imageUrl: 'https://raspagreen.com/selo-fair.png' },
    { name: 'Gambling Therapy', imageUrl: 'https://raspagreen.com/selo-therapy.png' },
];

export function SecuritySeals() {
    return (
        <div className="bg-card/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-center mb-6">Segurança e Confiança</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
                {seals.map((seal) => (
                    <div key={seal.name} className="flex items-center justify-center h-12">
                        <Image
                            src={seal.imageUrl}
                            alt={seal.name}
                            width={100}
                            height={48}
                            className="object-contain h-full w-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
