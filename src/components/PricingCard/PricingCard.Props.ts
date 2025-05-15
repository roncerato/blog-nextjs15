export interface IPricingCardProps {
    priceId: string,
    price: number,
    tokens: number,
    name: {
        ru: string;
        en: string;
    },
    desc: {
        ru: string;
        en: string;
    };
}
