import json
from pathlib import Path

path = Path("data/menu.json")

with path.open("r", encoding="utf-8") as f:
    data = json.load(f)

# Lingue supportate
data.setdefault("languages", {})
data["languages"].update({
    "it": "Italiano",
    "en": "English",
    "de": "Deutsch",
    "fr": "Français",
    "es": "Español",
    "pl": "Polski",
    "ru": "Русский",
    "zh": "中文",
    "ja": "日本語"
})

# Etichette UI
data.setdefault("ui", {})
data["ui"].update({
    "breakfast": {
        "it": "Colazioni",
        "en": "Breakfast",
        "de": "Frühstück",
        "fr": "Petit-déjeuner",
        "es": "Desayuno",
        "pl": "Śniadanie",
        "ru": "Завтрак",
        "zh": "早餐",
        "ja": "朝食"
    },
    "breakfast_intro": {
        "it": "Buffet colazione: ingredienti, allergeni e possibili tracce. In caso di allergie o intolleranze gravi, rivolgersi sempre al personale.",
        "en": "Breakfast buffet: ingredients, allergens and possible traces. In case of severe allergies or intolerances, please always ask the staff.",
        "de": "Frühstücksbuffet: Zutaten, Allergene und mögliche Spuren. Bei schweren Allergien oder Unverträglichkeiten wenden Sie sich bitte immer an das Personal.",
        "fr": "Buffet petit-déjeuner : ingrédients, allergènes et traces possibles. En cas d’allergies ou d’intolérances graves, veuillez toujours vous adresser au personnel.",
        "es": "Buffet de desayuno: ingredientes, alérgenos y posibles trazas. En caso de alergias o intolerancias graves, consulte siempre al personal.",
        "pl": "Bufet śniadaniowy: składniki, alergeny i możliwe ślady. W przypadku poważnych alergii lub nietolerancji prosimy zawsze zapytać personel.",
        "ru": "Завтрак «шведский стол»: ингредиенты, аллергены и возможные следы. При серьезной аллергии или непереносимости всегда обращайтесь к персоналу.",
        "zh": "自助早餐：配料、过敏原和可能痕量。如有严重过敏或不耐受，请务必咨询工作人员。",
        "ja": "朝食ビュッフェ：原材料、アレルゲン、微量混入の可能性。重度のアレルギーや不耐症がある場合は、必ずスタッフにお尋ねください。"
    },
    "ingredients": {
        "it": "Ingredienti",
        "en": "Ingredients",
        "de": "Zutaten",
        "fr": "Ingrédients",
        "es": "Ingredientes",
        "pl": "Składniki",
        "ru": "Ингредиенты",
        "zh": "配料",
        "ja": "原材料"
    },
    "traces": {
        "it": "Possibili tracce",
        "en": "Possible traces",
        "de": "Mögliche Spuren",
        "fr": "Traces possibles",
        "es": "Posibles trazas",
        "pl": "Możliwe ślady",
        "ru": "Возможные следы",
        "zh": "可能痕量",
        "ja": "微量混入の可能性"
    },
    "note": {
        "it": "Nota",
        "en": "Note",
        "de": "Hinweis",
        "fr": "Note",
        "es": "Nota",
        "pl": "Uwaga",
        "ru": "Примечание",
        "zh": "备注",
        "ja": "注記"
    }
})

breakfast = [
    {
        "name": {
            "it": "Crostata",
            "en": "Jam tart",
            "de": "Marmeladenkuchen",
            "fr": "Tarte à la confiture",
            "es": "Tarta de mermelada",
            "pl": "Tarta z dżemem",
            "ru": "Пирог с джемом",
            "zh": "果酱塔",
            "ja": "ジャムタルト"
        },
        "ingredients": {
            "it": "Uova, burro, zucchero, farina, marmellata di albicocca, frutti di bosco, mela, noci e cannella.",
            "en": "Eggs, butter, sugar, flour, apricot jam, berries, apple, walnuts and cinnamon.",
            "de": "Eier, Butter, Zucker, Mehl, Aprikosenmarmelade, Waldfrüchte, Apfel, Walnüsse und Zimt.",
            "fr": "Œufs, beurre, sucre, farine, confiture d’abricot, fruits des bois, pomme, noix et cannelle.",
            "es": "Huevos, mantequilla, azúcar, harina, mermelada de albaricoque, frutos del bosque, manzana, nueces y canela.",
            "pl": "Jaja, masło, cukier, mąka, dżem morelowy, owoce leśne, jabłko, orzechy włoskie i cynamon.",
            "ru": "Яйца, сливочное масло, сахар, мука, абрикосовый джем, лесные ягоды, яблоко, грецкие орехи и корица.",
            "zh": "鸡蛋、黄油、糖、面粉、杏子果酱、森林莓果、苹果、核桃和肉桂。",
            "ja": "卵、バター、砂糖、小麦粉、アプリコットジャム、ベリー、りんご、くるみ、シナモン。"
        },
        "allergens": "1, 3, 7, 8"
    },
    {
        "name": {
            "it": "Banana bread",
            "en": "Banana bread",
            "de": "Banana bread",
            "fr": "Banana bread",
            "es": "Banana bread",
            "pl": "Chlebek bananowy",
            "ru": "Банановый хлеб",
            "zh": "香蕉面包",
            "ja": "バナナブレッド"
        },
        "ingredients": {
            "it": "Farina, burro, zucchero, uova, frutta a guscio, banane.",
            "en": "Flour, butter, sugar, eggs, nuts, bananas.",
            "de": "Mehl, Butter, Zucker, Eier, Schalenfrüchte, Bananen.",
            "fr": "Farine, beurre, sucre, œufs, fruits à coque, bananes.",
            "es": "Harina, mantequilla, azúcar, huevos, frutos de cáscara, plátanos.",
            "pl": "Mąka, masło, cukier, jaja, orzechy, banany.",
            "ru": "Мука, сливочное масло, сахар, яйца, орехи, бананы.",
            "zh": "面粉、黄油、糖、鸡蛋、坚果、香蕉。",
            "ja": "小麦粉、バター、砂糖、卵、ナッツ類、バナナ。"
        },
        "allergens": "1, 3, 7, 8"
    },
    {
        "name": {
            "it": "Torta di carote",
            "en": "Carrot cake",
            "de": "Karottenkuchen",
            "fr": "Gâteau aux carottes",
            "es": "Tarta de zanahoria",
            "pl": "Ciasto marchewkowe",
            "ru": "Морковный пирог",
            "zh": "胡萝卜蛋糕",
            "ja": "キャロットケーキ"
        },
        "ingredients": {
            "it": "Farina, uova, zucchero, carote, olio di semi.",
            "en": "Flour, eggs, sugar, carrots, seed oil.",
            "de": "Mehl, Eier, Zucker, Karotten, Pflanzenöl.",
            "fr": "Farine, œufs, sucre, carottes, huile de graines.",
            "es": "Harina, huevos, azúcar, zanahorias, aceite de semillas.",
            "pl": "Mąka, jaja, cukier, marchew, olej z nasion.",
            "ru": "Мука, яйца, сахар, морковь, растительное масло.",
            "zh": "面粉、鸡蛋、糖、胡萝卜、植物油。",
            "ja": "小麦粉、卵、砂糖、にんじん、植物油。"
        },
        "allergens": "1, 3, 5",
        "note": {
            "it": "Allergene 5 da verificare: confermare se contiene arachidi, olio di arachide o tracce.",
            "en": "Allergen 5 to be checked: confirm whether it contains peanuts, peanut oil or traces.",
            "de": "Allergen 5 prüfen: enthält es Erdnüsse, Erdnussöl oder Spuren?",
            "fr": "Allergène 5 à vérifier : confirmer la présence d’arachides, d’huile d’arachide ou de traces.",
            "es": "Alérgeno 5 por verificar: confirmar si contiene cacahuetes, aceite de cacahuete o trazas.",
            "pl": "Alergen 5 do sprawdzenia: potwierdzić, czy zawiera orzeszki ziemne, olej arachidowy lub śladowe ilości.",
            "ru": "Аллерген 5 следует проверить: содержит ли арахис, арахисовое масло или следы.",
            "zh": "过敏原5需确认：是否含花生、花生油或痕量。",
            "ja": "アレルゲン5は確認が必要です：落花生、落花生油、または微量混入の有無。"
        }
    },
    {
        "name": {
            "it": "Pan brioche",
            "en": "Brioche bread",
            "de": "Briochebrot",
            "fr": "Pain brioche",
            "es": "Pan brioche",
            "pl": "Chleb brioche",
            "ru": "Бриошь",
            "zh": "布里欧修面包",
            "ja": "ブリオッシュパン"
        },
        "ingredients": {
            "it": "Farina, uova, sale, burro, zucchero, lievito di birra, acqua.",
            "en": "Flour, eggs, salt, butter, sugar, brewer’s yeast, water.",
            "de": "Mehl, Eier, Salz, Butter, Zucker, Bierhefe, Wasser.",
            "fr": "Farine, œufs, sel, beurre, sucre, levure de bière, eau.",
            "es": "Harina, huevos, sal, mantequilla, azúcar, levadura de cerveza, agua.",
            "pl": "Mąka, jaja, sól, masło, cukier, drożdże piwne, woda.",
            "ru": "Мука, яйца, соль, сливочное масло, сахар, пивные дрожжи, вода.",
            "zh": "面粉、鸡蛋、盐、黄油、糖、啤酒酵母、水。",
            "ja": "小麦粉、卵、塩、バター、砂糖、ビール酵母、水。"
        },
        "allergens": "1, 3, 7"
    },
    {
        "name": {
            "it": "Cornetti alla crema",
            "en": "Cream croissants",
            "de": "Croissants mit Creme",
            "fr": "Croissants à la crème",
            "es": "Cruasanes con crema",
            "pl": "Rogaliki z kremem",
            "ru": "Круассаны с кремом",
            "zh": "奶油羊角面包",
            "ja": "クリーム入りクロワッサン"
        },
        "ingredients": {
            "it": "Uova, burro, latte, farina, zucchero, lievito, acqua, vaniglia.",
            "en": "Eggs, butter, milk, flour, sugar, yeast, water, vanilla.",
            "de": "Eier, Butter, Milch, Mehl, Zucker, Hefe, Wasser, Vanille.",
            "fr": "Œufs, beurre, lait, farine, sucre, levure, eau, vanille.",
            "es": "Huevos, mantequilla, leche, harina, azúcar, levadura, agua, vainilla.",
            "pl": "Jaja, masło, mleko, mąka, cukier, drożdże, woda, wanilia.",
            "ru": "Яйца, сливочное масло, молоко, мука, сахар, дрожжи, вода, ваниль.",
            "zh": "鸡蛋、黄油、牛奶、面粉、糖、酵母、水、香草。",
            "ja": "卵、バター、牛乳、小麦粉、砂糖、酵母、水、バニラ。"
        },
        "allergens": "1, 3, 7"
    },
    {
        "name": {
            "it": "Salumi",
            "en": "Cold cuts",
            "de": "Aufschnitt",
            "fr": "Charcuterie",
            "es": "Embutidos",
            "pl": "Wędliny",
            "ru": "Мясная нарезка",
            "zh": "冷切肉",
            "ja": "ハム・サラミ類"
        },
        "ingredients": {
            "it": "Ingredienti da verificare secondo prodotto e fornitore.",
            "en": "Ingredients to be checked according to product and supplier.",
            "de": "Zutaten je nach Produkt und Lieferant zu prüfen.",
            "fr": "Ingrédients à vérifier selon le produit et le fournisseur.",
            "es": "Ingredientes por verificar según producto y proveedor.",
            "pl": "Składniki do sprawdzenia według produktu i dostawcy.",
            "ru": "Состав следует проверить по продукту и поставщику.",
            "zh": "配料需根据具体产品和供应商确认。",
            "ja": "原材料は商品および仕入先により確認が必要です。"
        },
        "allergens": "Da verificare",
        "note": {
            "it": "Controllare etichetta o scheda fornitore.",
            "en": "Check label or supplier sheet.",
            "de": "Etikett oder Lieferantendatenblatt prüfen.",
            "fr": "Vérifier l’étiquette ou la fiche fournisseur.",
            "es": "Comprobar etiqueta o ficha del proveedor.",
            "pl": "Sprawdzić etykietę lub kartę dostawcy.",
            "ru": "Проверить этикетку или карточку поставщика.",
            "zh": "请查看标签或供应商资料。",
            "ja": "ラベルまたは仕入先資料を確認してください。"
        }
    },
    {
        "name": {
            "it": "Formaggi",
            "en": "Cheeses",
            "de": "Käse",
            "fr": "Fromages",
            "es": "Quesos",
            "pl": "Sery",
            "ru": "Сыры",
            "zh": "奶酪",
            "ja": "チーズ"
        },
        "ingredients": {
            "it": "Latte, sale, caglio e/o fermenti secondo tipologia.",
            "en": "Milk, salt, rennet and/or cultures according to type.",
            "de": "Milch, Salz, Lab und/oder Kulturen je nach Sorte.",
            "fr": "Lait, sel, présure et/ou ferments selon le type.",
            "es": "Leche, sal, cuajo y/o fermentos según el tipo.",
            "pl": "Mleko, sól, podpuszczka i/lub kultury bakterii według rodzaju.",
            "ru": "Молоко, соль, сычужный фермент и/или закваски в зависимости от вида.",
            "zh": "牛奶、盐、凝乳酶和/或发酵剂，视种类而定。",
            "ja": "牛乳、塩、レンネットおよび/または発酵菌（種類による）。"
        },
        "allergens": "7"
    },
    {
        "name": {
            "it": "Salmone affumicato",
            "en": "Smoked salmon",
            "de": "Räucherlachs",
            "fr": "Saumon fumé",
            "es": "Salmón ahumado",
            "pl": "Łosoś wędzony",
            "ru": "Копчёный лосось",
            "zh": "烟熏三文鱼",
            "ja": "スモークサーモン"
        },
        "ingredients": {
            "it": "Salmone affumicato.",
            "en": "Smoked salmon.",
            "de": "Räucherlachs.",
            "fr": "Saumon fumé.",
            "es": "Salmón ahumado.",
            "pl": "Łosoś wędzony.",
            "ru": "Копчёный лосось.",
            "zh": "烟熏三文鱼。",
            "ja": "スモークサーモン。"
        },
        "allergens": "4"
    },
    {
        "name": {
            "it": "Uova strapazzate",
            "en": "Scrambled eggs",
            "de": "Rührei",
            "fr": "Œufs brouillés",
            "es": "Huevos revueltos",
            "pl": "Jajecznica",
            "ru": "Омлет-болтунья",
            "zh": "炒蛋",
            "ja": "スクランブルエッグ"
        },
        "ingredients": {
            "it": "Uova, latte, sale.",
            "en": "Eggs, milk, salt.",
            "de": "Eier, Milch, Salz.",
            "fr": "Œufs, lait, sel.",
            "es": "Huevos, leche, sal.",
            "pl": "Jaja, mleko, sól.",
            "ru": "Яйца, молоко, соль.",
            "zh": "鸡蛋、牛奶、盐。",
            "ja": "卵、牛乳、塩。"
        },
        "allergens": "3, 7"
    },
    {
        "name": {
            "it": "Pane bianco e pane ai cereali",
            "en": "White bread and cereal bread",
            "de": "Weißbrot und Körnerbrot",
            "fr": "Pain blanc et pain aux céréales",
            "es": "Pan blanco y pan de cereales",
            "pl": "Biały chleb i chleb zbożowy",
            "ru": "Белый хлеб и зерновой хлеб",
            "zh": "白面包和谷物面包",
            "ja": "白パン・穀物パン"
        },
        "ingredients": {
            "it": "Farina, acqua, lievito, sale, cereali vari.",
            "en": "Flour, water, yeast, salt, mixed cereals.",
            "de": "Mehl, Wasser, Hefe, Salz, verschiedene Getreide.",
            "fr": "Farine, eau, levure, sel, céréales variées.",
            "es": "Harina, agua, levadura, sal, cereales variados.",
            "pl": "Mąka, woda, drożdże, sól, różne zboża.",
            "ru": "Мука, вода, дрожжи, соль, различные злаки.",
            "zh": "面粉、水、酵母、盐、各种谷物。",
            "ja": "小麦粉、水、酵母、塩、各種穀物。"
        },
        "allergens": "1, 11",
        "note": {
            "it": "Sesamo da verificare se presente nel pane ai cereali.",
            "en": "Sesame to be checked if present in the cereal bread.",
            "de": "Sesam prüfen, falls im Körnerbrot enthalten.",
            "fr": "Sésame à vérifier s’il est présent dans le pain aux céréales.",
            "es": "Sésamo por verificar si está presente en el pan de cereales.",
            "pl": "Sezam do sprawdzenia, jeśli występuje w chlebie zbożowym.",
            "ru": "Кунжут следует проверить, если он присутствует в зерновом хлебе.",
            "zh": "如谷物面包含芝麻，需确认。",
            "ja": "穀物パンにごまが含まれる場合は確認が必要です。"
        }
    },
    {
        "name": {
            "it": "Latte intero",
            "en": "Whole milk",
            "de": "Vollmilch",
            "fr": "Lait entier",
            "es": "Leche entera",
            "pl": "Mleko pełne",
            "ru": "Цельное молоко",
            "zh": "全脂牛奶",
            "ja": "全乳"
        },
        "ingredients": {
            "it": "Latte.",
            "en": "Milk.",
            "de": "Milch.",
            "fr": "Lait.",
            "es": "Leche.",
            "pl": "Mleko.",
            "ru": "Молоко.",
            "zh": "牛奶。",
            "ja": "牛乳。"
        },
        "allergens": "7"
    },
    {
        "name": {
            "it": "Latte di soia",
            "en": "Soy milk",
            "de": "Sojamilch",
            "fr": "Boisson au soja",
            "es": "Bebida de soja",
            "pl": "Napój sojowy",
            "ru": "Соевый напиток",
            "zh": "豆奶",
            "ja": "豆乳"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "6"
    },
    {
        "name": {
            "it": "Latte di mandorla",
            "en": "Almond milk",
            "de": "Mandeldrink",
            "fr": "Boisson à l’amande",
            "es": "Bebida de almendra",
            "pl": "Napój migdałowy",
            "ru": "Миндальный напиток",
            "zh": "杏仁饮品",
            "ja": "アーモンドミルク"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "8"
    },
    {
        "name": {
            "it": "Yogurt",
            "en": "Yogurt",
            "de": "Joghurt",
            "fr": "Yaourt",
            "es": "Yogur",
            "pl": "Jogurt",
            "ru": "Йогурт",
            "zh": "酸奶",
            "ja": "ヨーグルト"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "7"
    },
    {
        "name": {
            "it": "Cereali, muesli e granola",
            "en": "Cereals, muesli and granola",
            "de": "Cerealien, Müsli und Granola",
            "fr": "Céréales, muesli et granola",
            "es": "Cereales, muesli y granola",
            "pl": "Płatki, musli i granola",
            "ru": "Хлопья, мюсли и гранола",
            "zh": "谷物、麦片和格兰诺拉",
            "ja": "シリアル、ミューズリー、グラノーラ"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "Da verificare",
        "traces": {
            "it": "Possibili glutine, soia, latte, frutta a guscio, sesamo.",
            "en": "Possible gluten, soy, milk, nuts, sesame.",
            "de": "Möglich: Gluten, Soja, Milch, Schalenfrüchte, Sesam.",
            "fr": "Possibles : gluten, soja, lait, fruits à coque, sésame.",
            "es": "Posibles: gluten, soja, leche, frutos de cáscara, sésamo.",
            "pl": "Możliwe: gluten, soja, mleko, orzechy, sezam.",
            "ru": "Возможны: глютен, соя, молоко, орехи, кунжут.",
            "zh": "可能含麸质、大豆、牛奶、坚果、芝麻。",
            "ja": "グルテン、大豆、乳、ナッツ類、ごまの可能性。"
        }
    },
    {
        "name": {
            "it": "Semi misti",
            "en": "Mixed seeds",
            "de": "Gemischte Samen",
            "fr": "Graines mélangées",
            "es": "Semillas mixtas",
            "pl": "Mieszane nasiona",
            "ru": "Смесь семян",
            "zh": "混合种子",
            "ja": "ミックスシード"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "11 se contiene sesamo",
        "note": {
            "it": "Il sesamo è allergene UE; altri semi vanno comunque indicati come ingredienti.",
            "en": "Sesame is an EU allergen; other seeds should still be listed as ingredients.",
            "de": "Sesam ist ein EU-Allergen; andere Samen sollten trotzdem als Zutaten angegeben werden.",
            "fr": "Le sésame est un allergène UE ; les autres graines doivent tout de même être indiquées comme ingrédients.",
            "es": "El sésamo es un alérgeno UE; las otras semillas deben indicarse igualmente como ingredientes.",
            "pl": "Sezam jest alergenem UE; inne nasiona należy mimo wszystko podać jako składniki.",
            "ru": "Кунжут является аллергеном ЕС; другие семена также следует указывать как ингредиенты.",
            "zh": "芝麻是欧盟过敏原；其他种子仍应作为配料列出。",
            "ja": "ごまはEU指定アレルゲンです。他の種子も原材料として記載してください。"
        }
    },
    {
        "name": {
            "it": "Frutta secca e frutta disidratata",
            "en": "Nuts and dried fruit",
            "de": "Schalenfrüchte und Trockenfrüchte",
            "fr": "Fruits à coque et fruits secs",
            "es": "Frutos de cáscara y fruta deshidratada",
            "pl": "Orzechy i suszone owoce",
            "ru": "Орехи и сухофрукты",
            "zh": "坚果和干果",
            "ja": "ナッツ類・ドライフルーツ"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "8, 5 se contiene arachidi",
        "traces": {
            "it": "Possibili solfiti nella frutta disidratata, da verificare.",
            "en": "Possible sulphites in dried fruit, to be checked.",
            "de": "Mögliche Sulfite in Trockenfrüchten, zu prüfen.",
            "fr": "Sulfites possibles dans les fruits secs, à vérifier.",
            "es": "Posibles sulfitos en fruta deshidratada, por verificar.",
            "pl": "Możliwe siarczyny w suszonych owocach, do sprawdzenia.",
            "ru": "Возможны сульфиты в сухофруктах, следует проверить.",
            "zh": "干果中可能含亚硫酸盐，需确认。",
            "ja": "ドライフルーツに亜硫酸塩が含まれる可能性があります。確認が必要です。"
        }
    },
    {
        "name": {
            "it": "Burro, confetture e miele",
            "en": "Butter, jams and honey",
            "de": "Butter, Konfitüren und Honig",
            "fr": "Beurre, confitures et miel",
            "es": "Mantequilla, mermeladas y miel",
            "pl": "Masło, dżemy i miód",
            "ru": "Масло, джемы и мёд",
            "zh": "黄油、果酱和蜂蜜",
            "ja": "バター、ジャム、はちみつ"
        },
        "ingredients": {
            "it": "Burro: latte. Confetture e miele: da verificare secondo etichetta del prodotto.",
            "en": "Butter: milk. Jams and honey: to be checked according to the product label.",
            "de": "Butter: Milch. Konfitüren und Honig: gemäß Produktetikett zu prüfen.",
            "fr": "Beurre : lait. Confitures et miel : à vérifier selon l’étiquette du produit.",
            "es": "Mantequilla: leche. Mermeladas y miel: por verificar según la etiqueta del producto.",
            "pl": "Masło: mleko. Dżemy i miód: do sprawdzenia według etykiety produktu.",
            "ru": "Масло: молоко. Джемы и мёд: проверить согласно этикетке продукта.",
            "zh": "黄油：牛奶。果酱和蜂蜜：需根据产品标签确认。",
            "ja": "バター：乳。ジャムとはちみつ：商品の表示に従って確認が必要です。"
        },
        "allergens": "7 per il burro"
    },
    {
        "name": {
            "it": "Succhi di frutta e acqua",
            "en": "Fruit juices and water",
            "de": "Fruchtsäfte und Wasser",
            "fr": "Jus de fruits et eau",
            "es": "Zumos de fruta y agua",
            "pl": "Soki owocowe i woda",
            "ru": "Фруктовые соки и вода",
            "zh": "果汁和水",
            "ja": "フルーツジュース・水"
        },
        "ingredients": {
            "it": "Da verificare secondo etichetta del prodotto.",
            "en": "To be checked according to the product label.",
            "de": "Gemäß Produktetikett zu prüfen.",
            "fr": "À vérifier selon l’étiquette du produit.",
            "es": "Por verificar según la etiqueta del producto.",
            "pl": "Do sprawdzenia według etykiety produktu.",
            "ru": "Проверить согласно этикетке продукта.",
            "zh": "需根据产品标签确认。",
            "ja": "商品の表示に従って確認が必要です。"
        },
        "allergens": "Da verificare",
        "note": {
            "it": "Controllare eventuali solfiti o altri allergeni indicati in etichetta.",
            "en": "Check for sulphites or other allergens indicated on the label.",
            "de": "Auf Sulfite oder andere auf dem Etikett angegebene Allergene prüfen.",
            "fr": "Vérifier les sulfites ou autres allergènes indiqués sur l’étiquette.",
            "es": "Comprobar sulfitos u otros alérgenos indicados en la etiqueta.",
            "pl": "Sprawdzić siarczyny lub inne alergeny wskazane na etykiecie.",
            "ru": "Проверить сульфиты или другие аллергены, указанные на этикетке.",
            "zh": "检查标签上是否标明亚硫酸盐或其他过敏原。",
            "ja": "ラベルに記載された亜硫酸塩やその他のアレルゲンを確認してください。"
        }
    }
]

data["breakfast"] = breakfast

# Salva JSON formattato
with path.open("w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("OK: sezione breakfast aggiunta a data/menu.json")
