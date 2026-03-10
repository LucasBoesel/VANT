const products = {
    1: {
        name: "Camisa Floral Lótus Azul",
        price: "R$ 119,90",
        category: "Masculino",
        collection: "Vibe Tropical",
        images: [
            "Assets/img/roupas/VibeTropical/CamisaFloralLotus/CamisaFloralLotus.png",
            "Assets/img/roupas/VibeTropical/CamisaFloralLotus/CamisalFloralLotusDeCostas.png",
            "Assets/img/roupas/VibeTropical/CamisaFloralLotus/CamisaFloralLotus4.png",
            "Assets/img/roupas/VibeTropical/CamisaFloralLotus/CamisaFloralLotus3.png"
        ],
        description: "Camisa floral azul com estampa de lótus, confeccionada em tecido leve e respirável."
    },
    2: {
        name: "Camisa Tropical Palmeira Branca",
        price: "R$ 105,90",
        category: "Masculino",
        collection: "Vibe Tropical",
        images: [
            "Assets/img/roupas/VibeTropical/CamisaTropicalPalmeira/CamisaTropicalPalmeira.PNG",
            "Assets/img/roupas/VibeTropical/CamisaTropicalPalmeira/CamisaTropicalPalmeiraDeCostas.PNG",
            "Assets/img/roupas/VibeTropical/CamisaTropicalPalmeira/CamisaTropicalPalmeira3.PNG",
            "Assets/img/roupas/VibeTropical/CamisaTropicalPalmeira/CamisaTropicalPalmeira4.PNG"
        ],
        description: "Camisa com estampa tropical de palmeira, confeccionada em tecido de alta qualidade."
    },
    3: {
        name: "Vestido Floral Azul",
        price: "R$ 103,90",
        oldPrice: "R$ 129,90",
        category: "Feminino",
        collection: "Vibe Tropical",
        images: [
            "Assets/img/roupas/VibeTropical/SwimVcay/SwimVcay.png", 
            "Assets/img/roupas/VibeTropical/SwimVcay/SwimVcayDeCostas.png",
            "Assets/img/roupas/VibeTropical/SwimVcay/SwimVcay3.png",
            "Assets/img/roupas/VibeTropical/SwimVcay/SwimVcay4.png"
        ],
        description: "Vestido curto azul com estampa floral, confeccionado em tecido fluido."
    },
    4: {
        name: "Saída de Praia Vibe Tropical Branca",
        price: "R$ 79,90",
        category: "Feminino",
        collection: "Vibe Tropical",
        images: [
            "Assets/img/roupas/VibeTropical/SaidadePraiaBranca/SaidadePraiaBranca.PNG",
            "Assets/img/roupas/VibeTropical/SaidadePraiaBranca/SaidadePraiaBrancaDeCostas.PNG",
            "Assets/img/roupas/VibeTropical/SaidadePraiaBranca/SaidadePraiaBranca3.PNG",
            "Assets/img/roupas/VibeTropical/SaidadePraiaBranca/SaidadePraiaBranca4.PNG"
        ],
        description: "Saída de praia branca em estilo chemise, confeccionada em tecido texturizado."
    },
    5: {
        name: "Camiseta Pima Essentials",
        price: "R$ 99,90",
        category: "Unissex",
        collection: "VANT Essentials",
        description: "Minimalismo em sua forma mais nobre. Confeccionada com o raríssimo Algodão Pima, esta camiseta oferece durabilidade três vezes superior e um toque de seda único. Uma peça essencial, unissex e atemporal para quem não abre mão da qualidade absoluta.",

        variants: {
            "Branca": [
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Branca/CamisetaPimaBranca1.png", 
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Branca/CamisetaPimaBranca2.png",
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Branca/CamisetaPimaBranca3.png"
            ],
            "Preta": [
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Preta/CamisetaPimaPreta1.png", 
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Preta/CamisetaPimaPreta2.png",
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Preta/CamisetaPimaPreta3.png"
            ],
            "Azul": [
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Azul/CamisetaPimaAzul1.png", 
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Azul/CamisetaPimaAzul2.png",
                "Assets/img/roupas/VANTEssentials/CamisetaPima/Azul/CamisetaPimaAzul3.png"
            ]
        },
        
        images: ["Assets/img/roupas/VANTEssentials/CamisetaPima/Branca/CamisetaPimaBranca1.png", "Assets/img/roupas/VANTEssentials/CamisetaPima/Branca/CamisetaPimaBranca2.png"]
    },
    6: {
        name: "Camiseta Boxy Tech Essentials",
        price: "R$ 139,90",
        category: "Unissex",
        collection: "VANT Essentials",
        description: "A união entre o streetwear e a alta performance. Com modelagem Boxy estruturada, esta peça utiliza tecnologia híbrida de Algodão e Dry, garantindo um toque natural com secagem ultra-rápida. Desenvolvida para manter o shape impecável e o conforto térmico absoluto em qualquer ocasião.",

        variants: {
            "Off White": [
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/OffWhite/CamisetaBoxyOffWhite1.png", 
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/OffWhite/CamisetaBoxyOffWhite2.png",
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/OffWhite/CamisetaBoxyOffWhite3.png"
            ],
            "Preta": [
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/Preta/CamisetaBoxyPreta1.png", 
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/Preta/CamisetaBoxyPreta2.png",
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/Preta/CamisetaBoxyPreta3.png"
            ],
            "Roxa": [
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/Roxa/CamisetaBoxyRoxa1.png", 
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/Roxa/CamisetaBoxyRoxa2.png",
                "Assets/img/roupas/VANTEssentials/CamisetaBoxy/Roxa/CamisetaBoxyRoxa3.png"
            ]
        },
        
        images: ["Assets/img/roupas/VANTEssentials/CamisetaBoxy/OffWhite/CamisetaBoxyOffWhite1.png", "Assets/img/roupas/VANTEssentials/CamisetaBoxy/OffWhite/CamisetaBoxyOffWhite2.png"]
    },
    7: {
        name: "Camiseta Waffle Texture Essentials",
        price: "R$ 103,90",
        oldPrice: "R$ 129,90",
        category: "Unissex",
        collection: "VANT Essentials",
        description: "Equilíbrio entre estrutura e conforto térmico. Desenvolvida em algodão com trama Waffle em alto relevo, esta peça oferece uma textura rica e um caimento impecável. Com modelagem Regular atemporal, é a escolha ideal para compor camadas ou ser a protagonista de um visual minimalista e sofisticado.",
    
        variants: {
            "Preta": [
                "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Preta/CamisetaWafflePreta1.png",
                "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Preta/CamisetaWafflePreta2.png",  
                "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Preta/CamisetaWafflePreta3.png" 
            ],
            "Branca": [
                "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Branca/CamisetaWaffleBranca1.png",
                "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Branca/CamisetaWaffleBranca2.png",  
                "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Branca/CamisetaWaffleBranca3.png" 
            ]
        },
        images: ["Assets/img/roupas/VANTEssentials/CamisetaWaffle/Preta/CamisetaWafflePreta1.png", "Assets/img/roupas/VANTEssentials/CamisetaWaffle/Preta/CamisetaWafflePreta2.png"]
    },
    8: {
        name: "Calça VANT Outline Denim",
        price: "R$ 191,90",
        oldPrice: "R$ 239,90",
        category: "Masculino",
        collection: "Original VANT",
        images: [
            "Assets/img/roupas/OriginalVANT/VANTOutlineDenim/VANTOutlineDenim1.png",
            "Assets/img/roupas/OriginalVANT/VANTOutlineDenim/VANTOutlineDenim2.png",
            "Assets/img/roupas/OriginalVANT/VANTOutlineDenim/VANTOutlineDenim3.png",
            "Assets/img/roupas/OriginalVANT/VANTOutlineDenim/VANTOutlineDenim4.png"
        ],
       description: "Peça exclusiva da linha Original VANT. A Calça Outline Denim funde o peso do jeans industrial à fluidez da arte de rua em uma modelagem Super Baggy de volume arquitetônico. Sua estampa em grafite contorna toda a peça, criando um visual dinâmico que redefine a silhueta urbana. Desenvolvida para quem exige o máximo de presença e autenticidade no cenário streetwear."
    },
    9: {
        name: "Camisa VANT Mythos",
        price: "R$ 135,90",
        oldPrice: "R$ 169,90",
        category: "Masculino",
        collection: "Original VANT",
        images: [
            "Assets/img/roupas/OriginalVANT/VantMythos/CamisaVantMythos.png",
            "Assets/img/roupas/OriginalVANT/VantMythos/CamisaVantMythosDeCostas.png",
            "Assets/img/roupas/OriginalVANT/VantMythos/CamisaVantMythos3.png",
            "Assets/img/roupas/OriginalVANT/VantMythos/CamisaVantMythos4.png"
        ],
        description: "Peça exclusiva da linha Original VANT. Com estampa que funde a estética da mitologia grega a elementos tropicais e a imponência do tigre real. Confeccionada em tecido premium de caimento fluido."
    },
    10: {
        name: "Camisa VANT Knit Floral",
        price: "R$ 145,90",
        category: "Masculino",
        collection: "Original VANT",
        images: [
            "Assets/img/roupas/OriginalVANT/KnitFloral/KnitFloral1.png",
            "Assets/img/roupas/OriginalVANT/KnitFloral/KnitFloral2.png",
            "Assets/img/roupas/OriginalVANT/KnitFloral/KnitFloral3.png",
            "Assets/img/roupas/OriginalVANT/KnitFloral/KnitFloral4.png"
        ],
        description: "Peça exclusiva da linha Original VANT. Desenvolvida em malha de tricô tecnológica (Knit), esta peça apresenta bordados florais de alta definição, unindo o conforto do 'loose fit' à sofisticação do 'business casual'. Sua estrutura elástica premium garante respirabilidade e um caimento impecável, transitando com facilidade entre o estilo casual e eventos sofisticados."
    },
    11: {
        name: "Camiseta VANT Graphics",
        price: "R$ 89,90",
        category: "Unissex",
        collection: "Original VANT",
        images: [
            "Assets/img/roupas/OriginalVANT/YourTurnGraphics/YourTurnWhite1.png",
            "Assets/img/roupas/OriginalVANT/YourTurnGraphics/YourTurnWhite2.png",
            "Assets/img/roupas/OriginalVANT/YourTurnGraphics/YourTurnWhite3.png",
            "Assets/img/roupas/OriginalVANT/YourTurnGraphics/YourTurnWhite4.png"
        ],
        description: "A essência do streetwear em uma peça versátil. Com modelagem Regular Fit unissex, esta camiseta apresenta uma estampa gráfica exclusiva (potiskana) em contraste com o branco puro. Confeccionada em algodão de alta gramatura, oferece conforto e durabilidade para o uso diário, sendo um item indispensável para composições urbanas e modernas."
    },
    12: {
        name: "Calça VANT Blue Loose Denim",
        price: "R$ 199,90",
        category: "Masculino",
        collection: "Original VANT",
        images: [
            "Assets/img/roupas/OriginalVANT/BlueLooseDenim/BlueLooseDenim1.png",
            "Assets/img/roupas/OriginalVANT/BlueLooseDenim/BlueLooseDenim2.png",
            "Assets/img/roupas/OriginalVANT/BlueLooseDenim/BlueLooseDenim3.png",
            "Assets/img/roupas/OriginalVANT/BlueLooseDenim/BlueLooseDenim4.png"
        ],
        description: "A redefinição do clássico denim. Com modelagem Loose Fit, esta calça oferece uma silhueta ampla e relaxada, garantindo total liberdade de movimento sem perder a estrutura. Desenvolvida em jeans de alta gramatura com lavagem média atemporal, é a peça base ideal para quem busca o equilíbrio entre o conforto extremo e a estética streetwear sofisticada."
    }
};