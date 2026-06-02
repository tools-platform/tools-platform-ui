import type { ToolContent } from "../data/toolContent";
export const toolContentById: Record<string, ToolContent> = {
    "net-salary-colombia": {
        intro: {
            es: "Esta calculadora de salario neto Colombia ayuda a estimar cuánto dinero recibirías realmente después de los descuentos básicos de nómina.",
            en: "This Colombia net salary calculator helps estimate how much money you would actually receive after basic payroll deductions.",
            hi: "\u092F\u0939 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u092F\u0939 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948 \u0915\u093F \u092E\u0942\u0932 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u092C\u093E\u0926 \u0906\u092A\u0915\u094B \u0935\u093E\u0938\u094D\u0924\u0935 \u092E\u0947\u0902 \u0915\u093F\u0924\u0928\u093E \u092A\u0948\u0938\u093E \u092E\u093F\u0932\u0947\u0917\u093E\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Parte del salario mensual bruto y descuenta los aportes del empleado a salud y pensión para estimar el sueldo neto mensual y quincenal.",
                        en: "It starts from the gross monthly salary and subtracts employee health and pension contributions to estimate monthly and biweekly take-home pay.",
                        hi: "\u092F\u0939 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u093E \u0939\u0948 \u0914\u0930 \u092E\u093E\u0938\u093F\u0915 \u0914\u0930 \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u091F\u0947\u0915-\u0939\u094B\u092E \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0914\u0930 \u092A\u0947\u0902\u0936\u0928 \u092F\u094B\u0917\u0926\u093E\u0928 \u0915\u094B \u0918\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También puede mostrar auxilio de transporte, Fondo de Solidaridad Pensional y deducciones adicionales cuando aplican. No reemplaza el desprendible oficial de nómina.",
                        en: "It can also show transport allowance, the solidarity pension fund, and extra deductions when they apply. It does not replace an official payslip.",
                        hi: "\u092F\u0939 \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E, \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u092A\u0947\u0902\u0936\u0928 \u0928\u093F\u0927\u093F \u0914\u0930 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0915\u091F\u094C\u0924\u0940 \u092D\u0940 \u0926\u093F\u0916\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964 \u092F\u0939 \u0906\u0927\u093F\u0915\u093E\u0930\u093F\u0915 \u0935\u0947\u0924\u0928-\u092A\u0930\u094D\u091A\u0940 \u0915\u093E \u0938\u094D\u0925\u093E\u0928 \u0928\u0939\u0940\u0902 \u0932\u0947\u0924\u093E\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usarla", en: "How to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Ingresa tu salario mensual bruto, el año de reglas y cualquier descuento de nómina adicional que quieras considerar para calcular el salario neto.",
                        en: "Enter your gross monthly salary, the rule year, and any extra payroll deductions you want to include when calculating net salary.",
                        hi: "\u0905\u092A\u0928\u093E \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928, \u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u0914\u0930 \u0915\u094B\u0908 \u092D\u0940 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 \u091C\u093F\u0938\u0947 \u0906\u092A \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u0947 \u0938\u092E\u092F \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Activa el auxilio de transporte o el Fondo de Solidaridad solo si quieres ver ese detalle en el resultado.",
                        en: "Enable transport allowance or the solidarity fund only if you want to see that detail in the result.",
                        hi: "\u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u092F\u093E \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0924\u092D\u0940 \u0938\u0915\u094D\u0937\u092E \u0915\u0930\u0947\u0902 \u091C\u092C \u0906\u092A \u092A\u0930\u093F\u0923\u093E\u092E \u092E\u0947\u0902 \u0935\u0939 \u0935\u093F\u0935\u0930\u0923 \u0926\u0947\u0916\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u094B\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Cómo calcular mi salario neto en Colombia?",
                    en: "How do I calculate my net salary in Colombia?",
                    hi: "\u092E\u0948\u0902 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0905\u092A\u0928\u0947 \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?"
                },
                answer: {
                    es: "Escribe tu salario mensual bruto y el año de reglas. La calculadora descuenta salud, pensión y otros conceptos aplicables para estimar el valor neto mensual y quincenal.",
                    en: "Enter your gross monthly salary and rule year. The calculator subtracts health, pension, and applicable items to estimate monthly and biweekly take-home pay.",
                    hi: "\u0905\u092A\u0928\u093E \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u092E\u093E\u0938\u093F\u0915 \u0914\u0930 \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u091F\u0947\u0915-\u0939\u094B\u092E \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u0932\u093E\u0917\u0942 \u0935\u0938\u094D\u0924\u0941\u0913\u0902 \u0915\u094B \u0918\u091F\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿El auxilio de transporte siempre aplica?",
                    en: "Does the transport allowance always apply?",
                    hi: "\u0915\u094D\u092F\u093E \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u0939\u092E\u0947\u0936\u093E \u0932\u093E\u0917\u0942 \u0939\u094B\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "No. Depende del salario y de los límites legales del año seleccionado. La herramienta valida si el salario cumple el límite.",
                    en: "No. It depends on the salary and the legal limits of the selected year. The tool checks whether the salary meets that threshold.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u091A\u092F\u0928\u093F\u0924 \u0935\u0930\u094D\u0937 \u0915\u0947 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u0940\u092E\u093E \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u091F\u0942\u0932 \u092F\u0939 \u091C\u093E\u0901\u091A\u0924\u093E \u0939\u0948 \u0915\u093F \u0935\u0947\u0924\u0928 \u0909\u0938 \u0938\u0940\u092E\u093E \u0915\u0947 \u0905\u0928\u0941\u0930\u0942\u092A \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿Este cálculo incluye retención en la fuente?",
                    en: "Does this calculation include withholding tax?",
                    hi: "\u0915\u094D\u092F\u093E \u0907\u0938 \u0917\u0923\u0928\u093E \u092E\u0947\u0902 \u0935\u093F\u0926\u0939\u094B\u0932\u094D\u0921\u093F\u0902\u0917 \u091F\u0948\u0915\u094D\u0938 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948?"
                },
                answer: {
                    es: "No. La retención, pagos no salariales, acuerdos especiales y otros conceptos pueden cambiar el valor final.",
                    en: "No. Withholding tax, non-salary payments, special agreements, and other concepts may change the final amount.",
                    hi: "\u0928\u0939\u0940\u0902, \u0935\u093F\u0926\u0939\u094B\u0932\u094D\u0921\u093F\u0902\u0917 \u091F\u0948\u0915\u094D\u0938, \u0917\u0948\u0930-\u0935\u0947\u0924\u0928 \u092D\u0941\u0917\u0924\u093E\u0928, \u0935\u093F\u0936\u0947\u0937 \u0938\u092E\u091D\u094C\u0924\u0947 \u0914\u0930 \u0905\u0928\u094D\u092F \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0901 \u0905\u0902\u0924\u093F\u092E \u0930\u093E\u0936\u093F \u0915\u094B \u092C\u0926\u0932 \u0938\u0915\u0924\u0940 \u0939\u0948\u0902\u0964"
                }
            }
        ]
    },
    "gross-salary-colombia": {
        intro: {
            es: "Esta calculadora estima el salario bruto mensual en Colombia a partir del neto que recibes mensual o quincenal.",
            en: "This calculator estimates gross monthly salary in Colombia from the net amount you receive monthly or biweekly.",
            hi: "\u092F\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0906\u092A\u0915\u094B \u092E\u093E\u0938\u093F\u0915 \u092F\u093E \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0928\u0947 \u0935\u093E\u0932\u0940 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0938\u0947 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Parte del salario neto recibido y busca el salario bruto mensual aproximado que, después de salud, pensión y otros descuentos, produce ese neto.",
                        en: "It starts from the received net salary and estimates the gross monthly salary that produces that net amount after health, pension, and other deductions.",
                        hi: "\u092F\u0939 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u093E \u0939\u0948 \u0914\u0930 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948 \u091C\u094B \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u0905\u0928\u094D\u092F \u0915\u091F\u094C\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u093E\u0926 \u0909\u0938 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0915\u093E \u0909\u0924\u094D\u092A\u093E\u0926\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También muestra bruto quincenal, neto mensual usado, neto quincenal, descuentos de salud, pensión, Fondo de Solidaridad cuando aplica y auxilio de transporte si lo activas.",
                        en: "It also shows gross biweekly salary, monthly net used, biweekly net, health and pension deductions, solidarity fund when applicable, and transport allowance if enabled.",
                        hi: "\u092F\u0939 \u0938\u0915\u0932 \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0935\u0947\u0924\u0928, \u092E\u093E\u0938\u093F\u0915 \u0936\u0941\u0926\u094D\u0927 \u0909\u092A\u092F\u094B\u0917, \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0936\u0941\u0926\u094D\u0927, \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0914\u0930 \u092A\u0947\u0902\u0936\u0928 \u0915\u091F\u094C\u0924\u0940, \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0914\u0930 \u0938\u0915\u094D\u0937\u092E \u0939\u094B\u0928\u0947 \u092A\u0930 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u092D\u0940 \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarla", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Úsala cuando solo sabes cuánto te consignan o cuánto recibes quincenalmente y quieres aproximar cuál es tu salario bruto mensual.",
                        en: "Use it when you only know how much is deposited or how much you receive biweekly and want to estimate your gross monthly salary.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0924\u092C \u0915\u0930\u0947\u0902 \u091C\u092C \u0906\u092A \u0915\u0947\u0935\u0932 \u092F\u0939 \u091C\u093E\u0928\u0924\u0947 \u0939\u094B\u0902 \u0915\u093F \u0915\u093F\u0924\u0928\u093E \u091C\u092E\u093E \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948 \u092F\u093E \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u093F\u0924\u0928\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0905\u092A\u0928\u0947 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Es una estimación inversa: los redondeos de nómina, retención en la fuente, beneficios o acuerdos internos pueden cambiar el valor final.",
                        en: "It is an inverse estimate: payroll rounding, withholding tax, benefits, or internal agreements may change the final value.",
                        hi: "\u092F\u0939 \u090F\u0915 \u0909\u0932\u091F\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0939\u0948: \u092A\u0947\u0930\u094B\u0932 \u0930\u093E\u0909\u0902\u0921\u093F\u0902\u0917, \u0935\u093F\u0926\u0939\u094B\u0932\u094D\u0921\u093F\u0902\u0917 \u091F\u0948\u0915\u094D\u0938, \u0932\u093E\u092D, \u092F\u093E \u0906\u0902\u0924\u0930\u093F\u0915 \u0938\u092E\u091D\u094C\u0924\u0947 \u0905\u0902\u0924\u093F\u092E \u092E\u0942\u0932\u094D\u092F \u0915\u094B \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Cómo calcular mi salario bruto si sé mi neto?",
                    en: "How do I calculate gross salary if I know my net pay?",
                    hi: "\u092F\u0926\u093F \u092E\u0941\u091D\u0947 \u0905\u092A\u0928\u093E \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u092A\u0924\u093E \u0939\u0948 \u0924\u094B \u092E\u0948\u0902 \u0938\u0915\u0932 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?"
                },
                answer: {
                    es: "Ingresa el valor neto que recibes y elige si es mensual o quincenal. La herramienta estima el salario bruto mensual necesario para llegar a ese neto.",
                    en: "Enter the net amount you receive and choose whether it is monthly or biweekly. The tool estimates the gross monthly salary needed to reach that net amount.",
                    hi: "\u0906\u092A\u0915\u094B \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0928\u0947 \u0935\u093E\u0932\u0940 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 \u0914\u0930 \u091A\u0941\u0928\u0947\u0902 \u0915\u093F \u092F\u0939 \u092E\u093E\u0938\u093F\u0915 \u0939\u0948 \u092F\u093E \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915\u0964 \u0909\u092A\u0915\u0930\u0923 \u0909\u0938 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0924\u0915 \u092A\u0939\u0941\u0902\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u0935\u0936\u094D\u092F\u0915 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿Sirve para nómina Colombia?",
                    en: "Does it work for Colombia payroll?",
                    hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u092A\u0947\u0930\u094B\u0932 \u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "Sí. Usa salud, pensión, Fondo de Solidaridad cuando aplica, auxilio de transporte opcional y otros descuentos de nómina.",
                    en: "Yes. It uses health, pension, solidarity fund when applicable, optional transport allowance, and other payroll deductions.",
                    hi: "\u0939\u093E\u0901\u0964 \u092F\u0939 \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928, \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F, \u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u0914\u0930 \u0905\u0928\u094D\u092F \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u093F\u092F\u094B\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "hourly-salary": {
        intro: {
            es: "Esta calculadora de salario por hora convierte un salario mensual en cuánto ganas por hora usando la jornada legal vigente en Colombia o una jornada personalizada.",
            en: "This hourly salary calculator converts a monthly salary into how much you earn per hour using Colombia's current legal workweek or a custom schedule.",
            hi: "\u092F\u0939 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u094B \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0915\u093E\u0928\u0942\u0928\u0940 \u0915\u093E\u0930\u094D\u092F \u0938\u092A\u094D\u0924\u093E\u0939 \u092F\u093E \u0915\u0938\u094D\u091F\u092E \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u093F\u0924\u0928\u093E \u0915\u092E\u093E\u0924\u0947 \u0939\u0948\u0902, \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Transforma un salario mensual en valor por hora y por día laboral para ayudarte a responder cuánto gano por hora y comparar ofertas o cambios de jornada.",
                        en: "It turns a monthly salary into hourly and daily pay so you can answer how much you earn per hour and compare offers or schedule changes.",
                        hi: "\u092F\u0939 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u094B \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0914\u0930 \u0926\u0948\u0928\u093F\u0915 \u0935\u0947\u0924\u0928 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0926\u0947\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F \u0906\u092A \u0909\u0924\u094D\u0924\u0930 \u0926\u0947 \u0938\u0915\u0947\u0902 \u0915\u093F \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u093F\u0924\u0928\u093E \u0915\u092E\u093E\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0911\u092B\u093C\u0930 \u092F\u093E \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Puedes calcular el valor bruto por hora o el valor neto estimado después de salud, pensión y Fondo de Solidaridad Pensional cuando aplica.",
                        en: "You can calculate the gross hourly value or the estimated net value after health, pension, and solidarity fund deductions when they apply.",
                        hi: "\u0906\u092A \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0915\u091F\u094C\u0924\u0940 \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0909\u0928\u0915\u0947 \u092C\u093E\u0926 \u0938\u0915\u0932 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u092E\u0942\u0932\u094D\u092F \u092F\u093E \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0936\u0941\u0926\u094D\u0927 \u092E\u0942\u0932\u094D\u092F \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usarla", en: "How to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Ingresa el salario mensual, elige si quieres ver el resultado bruto o neto y revisa las horas semanales legales que aparecen por defecto para Colombia.",
                        en: "Enter the monthly salary, choose whether you want the gross or net result, and review the legal weekly hours shown by default for Colombia.",
                        hi: "\u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902, \u091A\u0941\u0928\u0947\u0902 \u0915\u093F \u0906\u092A \u0938\u0915\u0932 \u092F\u093E \u0936\u0941\u0926\u094D\u0927 \u092A\u0930\u093F\u0923\u093E\u092E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902, \u0914\u0930 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0932\u093F\u090F \u0921\u093F\u092B\u093C\u0949\u0932\u094D\u091F \u0930\u0942\u092A \u0938\u0947 \u0926\u093F\u0916\u093E\u090F \u0917\u090F \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Si tu horario real es distinto al legal, usa el lápiz para editar las horas semanales y recalcular con tu jornada personalizada.",
                        en: "If your real schedule differs from the legal one, use the pencil to edit the weekly hours and recalculate with your custom schedule.",
                        hi: "\u092F\u0926\u093F \u0906\u092A\u0915\u093E \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0915\u093E\u0928\u0942\u0928\u0940 \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0938\u0947 \u092D\u093F\u0928\u094D\u0928 \u0939\u0948, \u0924\u094B \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u094B \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0928\u0947 \u0914\u0930 \u0905\u092A\u0928\u0947 \u0915\u0938\u094D\u091F\u092E \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0915\u0947 \u0938\u093E\u0925 \u092A\u0941\u0928\u0930\u094D\u0917\u0923\u0928\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092A\u0947\u0902\u0938\u093F\u0932 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Cómo saber cuánto gano por hora?",
                    en: "How do I know how much I earn per hour?",
                    hi: "\u092E\u0941\u091D\u0947 \u0915\u0948\u0938\u0947 \u092A\u0924\u093E \u091A\u0932\u0947\u0917\u093E \u0915\u093F \u092E\u0948\u0902 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u093F\u0924\u0928\u093E \u0915\u092E\u093E\u0924\u093E \u0939\u0942\u0901?"
                },
                answer: {
                    es: "Ingresa tu salario mensual y las horas semanales de trabajo. La herramienta divide el salario entre las horas estimadas del mes para mostrar el valor por hora.",
                    en: "Enter your monthly salary and weekly work hours. The tool divides salary by estimated monthly hours to show hourly pay.",
                    hi: "\u0905\u092A\u0928\u093E \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0915\u093E\u0930\u094D\u092F \u0918\u0902\u091F\u0947 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964 \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0935\u0947\u0924\u0928 \u0926\u093F\u0916\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0935\u0947\u0924\u0928 \u0915\u094B \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u092E\u093E\u0938\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0938\u0947 \u0935\u093F\u092D\u093E\u091C\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿Se puede calcular el valor hora dividiendo el salario mensual entre 240?",
                    en: "Can I calculate hourly pay by dividing monthly salary by 240?",
                    hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u094B 240 \u0938\u0947 \u0935\u093F\u092D\u093E\u091C\u093F\u0924 \u0915\u0930\u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?"
                },
                answer: {
                    es: "Sí, es una referencia común cuando se usa una jornada mensual de 240 horas. La herramienta también permite ajustar las horas semanales para reflejar la jornada legal vigente o tu horario real.",
                    en: "Yes, it is a common reference when using a 240-hour monthly schedule. The tool also lets you adjust weekly hours to match the current legal workweek or your real schedule.",
                    hi: "\u0939\u093E\u0901, 240-\u0918\u0902\u091F\u0947 \u0915\u0940 \u092E\u093E\u0938\u093F\u0915 \u0905\u0928\u0941\u0938\u0942\u091A\u0940 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u0947 \u0938\u092E\u092F \u092F\u0939 \u090F\u0915 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0938\u0902\u0926\u0930\u094D\u092D \u0939\u0948\u0964 \u092F\u0939 \u091F\u0942\u0932 \u0906\u092A\u0915\u094B \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0915\u093E\u0928\u0942\u0928\u0940 \u0915\u093E\u0930\u094D\u092F \u0938\u092A\u094D\u0924\u093E\u0939 \u092F\u093E \u0906\u092A\u0915\u0947 \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0938\u0947 \u092E\u0947\u0932 \u0916\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u094B \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0940 \u0938\u0941\u0935\u093F\u0927\u093E \u092D\u0940 \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿La herramienta usa las horas legales de Colombia?",
                    en: "Does the tool use Colombia's legal weekly hours?",
                    hi: "\u0915\u094D\u092F\u093E \u091F\u0942\u0932 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "Sí. Por defecto toma la jornada legal vigente en Colombia según la fecha actual. Aun así puedes editarla si tu contrato o acuerdo usa otra cantidad de horas.",
                    en: "Yes. By default it uses Colombia's current legal workweek based on today's date. You can still edit it if your contract uses a different number of hours.",
                    hi: "\u0939\u093E\u0901\u0964 \u0921\u093F\u092B\u093C\u0949\u0932\u094D\u091F \u0930\u0942\u092A \u0938\u0947 \u092F\u0939 \u0906\u091C \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0915\u093E\u0928\u0942\u0928\u0940 \u0915\u093E\u0930\u094D\u092F \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092F\u0926\u093F \u0906\u092A\u0915\u093E \u0905\u0928\u0941\u092C\u0902\u0927 \u0905\u0932\u0917-\u0905\u0932\u0917 \u0918\u0902\u091F\u094B\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0924\u094B \u092D\u0940 \u0906\u092A \u0907\u0938\u0947 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿El cálculo neto incluye todos los descuentos posibles?",
                    en: "Does the net calculation include every possible deduction?",
                    hi: "\u0915\u094D\u092F\u093E \u0936\u0941\u0926\u094D\u0927 \u0917\u0923\u0928\u093E \u092E\u0947\u0902 \u0939\u0930 \u0938\u0902\u092D\u0935 \u0915\u091F\u094C\u0924\u0940 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948?"
                },
                answer: {
                    es: "No. Estima salud, pensión y Fondo de Solidaridad Pensional cuando aplica. No incluye retención en la fuente, horas extra, recargos, auxilio de transporte ni descuentos especiales de nómina.",
                    en: "No. It estimates health, pension, and the solidarity pension fund when applicable. It does not include withholding tax, overtime, surcharges, transport allowance, or special payroll deductions.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u092A\u0947\u0902\u0936\u0928 \u092B\u0902\u0921 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964 \u0907\u0938\u092E\u0947\u0902 \u0935\u093F\u0926\u0939\u094B\u0932\u094D\u0921\u093F\u0902\u0917 \u091F\u0948\u0915\u094D\u0938, \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0938\u0930\u091A\u093E\u0930\u094D\u091C, \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u092F\u093E \u0935\u093F\u0936\u0947\u0937 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964"
                }
            }
        ]
    },
    "overtime-colombia": {
        intro: {
            es: "Esta calculadora de horas extras en Colombia estima el valor de horas extra, recargos nocturnos, dominicales y festivos desde un salario mensual.",
            en: "This Colombia overtime calculator estimates overtime, night surcharges, Sunday, and holiday pay from a monthly salary.",
            hi: "\u092F\u0939 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0938\u0947 \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0930\u093E\u0924\u094D\u0930\u093F \u0905\u0927\u093F\u092D\u093E\u0930, \u0930\u0935\u093F\u0935\u093E\u0930 \u0914\u0930 \u091B\u0941\u091F\u094D\u091F\u0940 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Convierte el salario mensual en valor de hora ordinaria usando la jornada semanal legal o una jornada personalizada.",
                        en: "It converts a monthly salary into a regular hourly value using the legal weekly workweek or a custom schedule.",
                        hi: "\u092F\u0939 \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0915\u093E\u0930\u094D\u092F \u0938\u092A\u094D\u0924\u093E\u0939 \u092F\u093E \u090F\u0915 \u0915\u0938\u094D\u091F\u092E \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u094B \u0928\u093F\u092F\u092E\u093F\u0924 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u0947 \u092E\u0942\u0932\u094D\u092F \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Luego aplica los factores de hora extra diurna, nocturna, recargo nocturno, dominical o festivo para estimar el total a pagar.",
                        en: "Then it applies factors for daytime overtime, night overtime, night surcharge, Sunday, and holiday pay to estimate the total amount.",
                        hi: "\u092B\u093F\u0930 \u092F\u0939 \u0915\u0941\u0932 \u0930\u093E\u0936\u093F \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0926\u093F\u0928 \u0915\u0947 \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0930\u093E\u0924 \u0915\u0947 \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0930\u093E\u0924 \u0915\u0947 \u0905\u0927\u093F\u092D\u093E\u0930, \u0930\u0935\u093F\u0935\u093E\u0930 \u0914\u0930 \u091B\u0941\u091F\u094D\u091F\u0940 \u0915\u0947 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0947 \u0915\u093E\u0930\u0915\u094B\u0902 \u0915\u094B \u0932\u093E\u0917\u0942 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usarla", en: "How to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Ingresa tu salario mensual, revisa el año de reglas y las horas semanales. Puedes editar la jornada si tu contrato usa una cantidad diferente.",
                        en: "Enter your monthly salary, review the rule year and weekly hours. You can edit the schedule if your contract uses a different number.",
                        hi: "\u0905\u092A\u0928\u093E \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902, \u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u0914\u0930 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902\u0964 \u092F\u0926\u093F \u0906\u092A\u0915\u093E \u0905\u0928\u0941\u092C\u0902\u0927 \u0915\u093F\u0938\u0940 \u092D\u093F\u0928\u094D\u0928 \u0928\u0902\u092C\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0924\u094B \u0906\u092A \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Agrega cada tipo de hora con su cantidad, calcula y revisa el total estimado junto con el detalle por tipo de recargo.",
                        en: "Add each hour type with its quantity, calculate, and review the estimated total with the breakdown by surcharge type.",
                        hi: "\u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0918\u0902\u091F\u0947 \u0915\u0947 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u094B \u0909\u0938\u0915\u0940 \u092E\u093E\u0924\u094D\u0930\u093E \u0915\u0947 \u0938\u093E\u0925 \u091C\u094B\u0921\u093C\u0947\u0902, \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0914\u0930 \u0905\u0927\u093F\u092D\u093E\u0930 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u0915\u0947 \u0938\u093E\u0925 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0915\u0941\u0932 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Cómo se calculan las horas extras en Colombia?",
                    en: "How is overtime calculated in Colombia?",
                    hi: "\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948?"
                },
                answer: {
                    es: "Primero se calcula el valor de la hora ordinaria desde el salario mensual y las horas mensuales estimadas. Luego se multiplica por el factor del tipo de hora: extra diurna, extra nocturna, recargo nocturno, dominical o festivo.",
                    en: "First, the regular hourly value is calculated from monthly salary and estimated monthly hours. Then it is multiplied by the factor for the hour type: daytime overtime, night overtime, night surcharge, Sunday, or holiday.",
                    hi: "\u0938\u092C\u0938\u0947 \u092A\u0939\u0932\u0947, \u0928\u093F\u092F\u092E\u093F\u0924 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u092E\u0942\u0932\u094D\u092F \u0915\u0940 \u0917\u0923\u0928\u093E \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u092E\u093E\u0938\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0938\u0947 \u0915\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964 \u092B\u093F\u0930 \u0907\u0938\u0947 \u0918\u0902\u091F\u0947 \u0915\u0947 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0947 \u0915\u093E\u0930\u0915 \u0938\u0947 \u0917\u0941\u0923\u093E \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948: \u0926\u093F\u0928 \u0915\u093E \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0930\u093E\u0924 \u0915\u093E \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0930\u093E\u0924 \u0915\u093E \u0905\u0927\u093F\u092D\u093E\u0930, \u0930\u0935\u093F\u0935\u093E\u0930, \u092F\u093E \u091B\u0941\u091F\u094D\u091F\u0940\u0964"
                }
            },
            {
                question: {
                    es: "¿La calculadora usa la jornada legal de Colombia?",
                    en: "Does the calculator use Colombia's legal workweek?",
                    hi: "\u0915\u094D\u092F\u093E \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0915\u093E\u0928\u0942\u0928\u0940 \u0915\u093E\u0930\u094D\u092F \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "Sí. Por defecto usa la jornada legal de referencia según el año seleccionado, pero puedes editar las horas semanales si necesitas calcular con tu jornada real.",
                    en: "Yes. By default it uses the legal reference workweek for the selected year, but you can edit weekly hours if you need to calculate with your real schedule.",
                    hi: "\u0939\u093E\u0901\u0964 \u0921\u093F\u092B\u093C\u0949\u0932\u094D\u091F \u0930\u0942\u092A \u0938\u0947 \u092F\u0939 \u091A\u092F\u0928\u093F\u0924 \u0935\u0930\u094D\u0937 \u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u0902\u0926\u0930\u094D\u092D \u0915\u093E\u0930\u094D\u092F\u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948, \u0932\u0947\u0915\u093F\u0928 \u092F\u0926\u093F \u0906\u092A\u0915\u094B \u0905\u092A\u0928\u0947 \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0915\u0947 \u0938\u093E\u0925 \u0917\u0923\u0928\u093E \u0915\u0930\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948 \u0924\u094B \u0906\u092A \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u094B \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿El resultado reemplaza la nómina?",
                    en: "Does the result replace payroll?",
                    hi: "\u0915\u094D\u092F\u093E \u092A\u0930\u093F\u0923\u093E\u092E \u092A\u0947\u0930\u094B\u0932 \u0915\u0940 \u091C\u0917\u0939 \u0932\u0947\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "No. Es una estimación práctica. La nómina real puede cambiar por acuerdos internos, turnos mixtos, recargos ya pagados, redondeos, retención u otros conceptos laborales.",
                    en: "No. It is a practical estimate. Real payroll may change due to internal agreements, mixed shifts, already paid surcharges, rounding, withholding, or other labor items.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u090F\u0915 \u0935\u094D\u092F\u093E\u0935\u0939\u093E\u0930\u093F\u0915 \u0905\u0928\u0941\u092E\u093E\u0928 \u0939\u0948. \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u092A\u0947\u0930\u094B\u0932 \u0906\u0902\u0924\u0930\u093F\u0915 \u0938\u092E\u091D\u094C\u0924\u094B\u0902, \u092E\u093F\u0936\u094D\u0930\u093F\u0924 \u092A\u093E\u0930\u093F\u092F\u094B\u0902, \u092A\u0939\u0932\u0947 \u0938\u0947 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093F\u090F \u0917\u090F \u0905\u0927\u093F\u092D\u093E\u0930, \u092A\u0942\u0930\u094D\u0923\u093E\u0902\u0915\u0928, \u0930\u094B\u0915 \u092F\u093E \u0905\u0928\u094D\u092F \u0936\u094D\u0930\u092E \u092E\u0926\u094B\u0902 \u0915\u0947 \u0915\u093E\u0930\u0923 \u092C\u0926\u0932 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "employee-salary-equivalent": {
        intro: {
            es: "Esta calculadora ayuda a convertir lo que cobras por hora como independiente en un sueldo equivalente como empleado.",
            en: "This calculator helps convert what you charge per hour as an independent worker into an equivalent employee salary.",
            hi: "\u092F\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u090F\u0915 \u0938\u094D\u0935\u0924\u0902\u0924\u094D\u0930 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u091C\u094B \u0936\u0941\u0932\u094D\u0915 \u0932\u0947\u0924\u0947 \u0939\u0948\u0902 \u0909\u0938\u0947 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0915\u0947 \u092C\u0930\u093E\u092C\u0930 \u0935\u0947\u0924\u0928 \u092E\u0947\u0902 \u092C\u0926\u0932\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Toma tu tarifa por hora y las horas que trabajas por semana para proyectar un ingreso semanal y un sueldo equivalente quincenal, mensual y anual.",
                        en: "It takes your hourly rate and weekly hours to project a weekly income and an equivalent biweekly, monthly, and annual employee salary.",
                        hi: "\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0906\u092F \u0914\u0930 \u0938\u092E\u0924\u0941\u0932\u094D\u092F \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0914\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u092A\u0915\u0940 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0915\u0940 \u0926\u0930 \u0914\u0930 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                    },
                    {
                        es: "También estima el neto mensual y quincenal como empleado dependiente en Colombia, descontando salud, pensión y Fondo de Solidaridad Pensional cuando aplica.",
                        en: "It also estimates monthly and biweekly net income as a dependent employee in Colombia after health, pension, and solidarity fund deductions when they apply.",
                        hi: "\u092F\u0939 \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u092C\u093E\u0926 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0906\u0936\u094D\u0930\u093F\u0924 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u092E\u093E\u0938\u093F\u0915 \u0914\u0930 \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0936\u0941\u0926\u094D\u0927 \u0906\u092F \u0915\u093E \u092D\u0940 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usarla", en: "How to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Ingresa cuánto cobras por hora y cuántas horas trabajas por semana con ese ritmo real de trabajo.",
                        en: "Enter how much you charge per hour and how many hours you truly work per week.",
                        hi: "\u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 \u0915\u093F \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u093F\u0924\u0928\u093E \u0936\u0941\u0932\u094D\u0915 \u0932\u0947\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0906\u092A \u0935\u093E\u0938\u094D\u0924\u0935 \u092E\u0947\u0902 \u092A\u094D\u0930\u0924\u093F \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u093F\u0924\u0928\u0947 \u0918\u0902\u091F\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "La herramienta te mostrará el equivalente como sueldo de empleado para que compares mejor ofertas, contratos o expectativas de ingreso.",
                        en: "The tool shows the equivalent employee salary so you can compare offers, contracts, or income expectations more easily.",
                        hi: "\u091F\u0942\u0932 \u0938\u092E\u0924\u0941\u0932\u094D\u092F \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0935\u0947\u0924\u0928 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F \u0906\u092A \u0911\u092B\u093C\u0930, \u0905\u0928\u0941\u092C\u0902\u0927 \u092F\u093E \u0906\u092F \u0905\u092A\u0947\u0915\u094D\u0937\u093E\u0913\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0905\u0927\u093F\u0915 \u0906\u0938\u093E\u0928\u0940 \u0938\u0947 \u0915\u0930 \u0938\u0915\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Esto calcula exactamente lo que me pagarían como empleado?",
                    en: "Does this calculate exactly what I would earn as an employee?",
                    hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0938\u091F\u0940\u0915 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948 \u0915\u093F \u090F\u0915 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u092E\u0948\u0902 \u0915\u093F\u0924\u0928\u093E \u0915\u092E\u093E\u090A\u0902\u0917\u093E?"
                },
                answer: {
                    es: "No. Es una equivalencia estimada. Sirve para comparar ingresos, pero no incluye retención en la fuente, recargos, auxilios, horas extra ni condiciones especiales del contrato.",
                    en: "No. It is an estimated equivalence. It helps you compare income, but it does not include withholding tax, surcharges, allowances, overtime, or special contract conditions.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u090F\u0915 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0924\u0941\u0932\u094D\u092F\u0924\u093E \u0939\u0948\u0964 \u092F\u0939 \u0906\u092A\u0915\u094B \u0906\u092F \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948, \u0932\u0947\u0915\u093F\u0928 \u0907\u0938\u092E\u0947\u0902 \u0935\u093F\u0926\u0939\u094B\u0932\u094D\u0921\u093F\u0902\u0917 \u091F\u0948\u0915\u094D\u0938, \u0938\u0930\u091A\u093E\u0930\u094D\u091C, \u092D\u0924\u094D\u0924\u0947, \u0913\u0935\u0930\u091F\u093E\u0907\u092E \u092F\u093E \u0935\u093F\u0936\u0947\u0937 \u0905\u0928\u0941\u092C\u0902\u0927 \u0936\u0930\u094D\u0924\u0947\u0902 \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿Por qué muestra bruto y neto?",
                    en: "Why does it show gross and net?",
                    hi: "\u092F\u0939 \u0917\u094D\u0930\u0949\u0938 \u0914\u0930 \u0928\u0947\u091F \u0915\u094D\u092F\u094B\u0902 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "Porque como empleado normalmente existe un salario bruto y luego descuentos de nómina. El neto te ayuda a entender mejor cuánto podría quedarte realmente.",
                    en: "Because employees usually have a gross salary and then payroll deductions. The net amount helps you understand what could actually remain.",
                    hi: "\u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u093F\u092F\u094B\u0902 \u0915\u093E \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0938\u0915\u0932 \u0935\u0947\u0924\u0928 \u0939\u094B\u0924\u093E \u0939\u0948 \u0914\u0930 \u092B\u093F\u0930 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0939\u094B\u0924\u0940 \u0939\u0948\u0964 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0906\u092A\u0915\u094B \u092F\u0939 \u0938\u092E\u091D\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u0940 \u0939\u0948 \u0915\u093F \u0935\u093E\u0938\u094D\u0924\u0935 \u092E\u0947\u0902 \u0915\u094D\u092F\u093E \u0930\u0939 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "employment-settlement-colombia": {
        intro: {
            es: "Esta calculadora de liquidación laboral en Colombia estima cuánto podría corresponderte cuando termina una relación de trabajo o quieres saber a cuánto equivale la liquidación.",
            en: "This Colombia employment settlement calculator estimates what may be owed when a work relationship ends.",
            hi: "\u092F\u0939 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u0930\u094B\u091C\u0917\u093E\u0930 \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948 \u0915\u093F \u0915\u093E\u0930\u094D\u092F \u0938\u0902\u092C\u0902\u0927 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0915\u093F\u0924\u0928\u093E \u092C\u0915\u093E\u092F\u093E \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Qué incluye", en: "What it includes", hi: "\u0907\u0938\u092E\u0947\u0902 \u0915\u094D\u092F\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948" },
                body: [
                    {
                        es: "Calcula cesantías, intereses de cesantías, prima de servicios, vacaciones pendientes, salario pendiente y otros pagos o deducciones que ingreses.",
                        en: "It calculates severance, severance interest, service bonus, unused vacation, pending salary, and any extra earnings or deductions you enter.",
                        hi: "\u092F\u0939 \u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u0935\u093F\u091A\u094D\u091B\u0947\u0926 \u092C\u094D\u092F\u093E\u091C, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938, \u0905\u092A\u094D\u0930\u092F\u0941\u0915\u094D\u0924 \u0905\u0935\u0915\u093E\u0936, \u0932\u0902\u092C\u093F\u0924 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0906\u092A\u0915\u0947 \u0926\u094D\u0935\u093E\u0930\u093E \u0926\u0930\u094D\u091C \u0915\u0940 \u0917\u0908 \u0915\u093F\u0938\u0940 \u092D\u0940 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0915\u092E\u093E\u0908 \u092F\u093E \u0915\u091F\u094C\u0924\u0940 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También sirve para preguntas comunes como calcular liquidación laboral, liquidación 2025, liquidación 2026 o cuánto equivale la liquidación al salir de un empleo.",
                        en: "It also helps with common questions such as calculating an employment settlement, estimating a past-year settlement, or understanding what a final payout may represent.",
                        hi: "\u092F\u0939 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u092A\u094D\u0930\u0936\u094D\u0928\u094B\u0902 \u092E\u0947\u0902 \u092D\u0940 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948 \u091C\u0948\u0938\u0947 \u0915\u093F \u0930\u094B\u091C\u0917\u093E\u0930 \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0928\u093E, \u092A\u093F\u091B\u0932\u0947 \u0935\u0930\u094D\u0937 \u0915\u0947 \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u093E, \u092F\u093E \u092F\u0939 \u0938\u092E\u091D\u0928\u093E \u0915\u093F \u0905\u0902\u0924\u093F\u092E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u094D\u092F\u093E \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Cuando eliges terminación sin justa causa, también puede estimar una indemnización según el tipo de contrato.",
                        en: "When you choose termination without just cause, it can also estimate dismissal compensation based on the contract type.",
                        hi: "\u091C\u092C \u0906\u092A \u0909\u091A\u093F\u0924 \u0915\u093E\u0930\u0923 \u0915\u0947 \u092C\u093F\u0928\u093E \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0924\u094B \u092F\u0939 \u0905\u0928\u0941\u092C\u0902\u0927 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u092C\u0930\u094D\u0916\u093E\u0938\u094D\u0924\u0917\u0940 \u092E\u0941\u0906\u0935\u091C\u0947 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u092D\u0940 \u0932\u0917\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Datos importantes", en: "Important inputs", hi: "\u092E\u0939\u0924\u094D\u0935\u092A\u0942\u0930\u094D\u0923 \u0907\u0928\u092A\u0941\u091F" },
                body: [
                    {
                        es: "Usa la fecha de inicio, fecha de finalización, salario base, tipo de contrato y motivo de terminación.",
                        en: "It uses the employment start date, end date, base salary, contract type, and termination reason.",
                        hi: "\u092F\u0939 \u0930\u094B\u091C\u0917\u093E\u0930 \u0906\u0930\u0902\u092D \u0924\u093F\u0925\u093F, \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F, \u0906\u0927\u093E\u0930 \u0935\u0947\u0924\u0928, \u0905\u0928\u0941\u092C\u0902\u0927 \u092A\u094D\u0930\u0915\u093E\u0930 \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0915\u093E\u0930\u0923 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "El cálculo puede variar por salario variable, pactos internos, sanciones, retenciones, pagos pendientes o interpretación legal del caso.",
                        en: "The estimate may vary because of variable salary, internal agreements, sanctions, withholdings, pending payments, or legal interpretation of the case.",
                        hi: "\u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0940\u092F \u0935\u0947\u0924\u0928, \u0906\u0902\u0924\u0930\u093F\u0915 \u0938\u092E\u091D\u094C\u0924\u094B\u0902, \u092A\u094D\u0930\u0924\u093F\u092C\u0902\u0927\u094B\u0902, \u0930\u094B\u0915, \u0932\u0902\u092C\u093F\u0924 \u092D\u0941\u0917\u0924\u093E\u0928 \u092F\u093E \u092E\u093E\u092E\u0932\u0947 \u0915\u0940 \u0915\u093E\u0928\u0942\u0928\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0915\u0947 \u0915\u093E\u0930\u0923 \u0905\u0928\u0941\u092E\u093E\u0928 \u092D\u093F\u0928\u094D\u0928 \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo leer el resultado", en: "How to read the result", hi: "\u0930\u093F\u091C\u0932\u094D\u091F \u0915\u0948\u0938\u0947 \u092A\u0922\u093C\u0947\u0902" },
                body: [
                    {
                        es: "El total separa la liquidación ordinaria de una posible indemnización. Esto ayuda a entender qué parte corresponde a prestaciones y qué parte nace por terminación sin justa causa.",
                        en: "The total separates the ordinary settlement from possible dismissal compensation. This helps distinguish benefits owed from compensation tied to termination without just cause.",
                        hi: "\u0915\u0941\u0932 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u094B \u0938\u0902\u092D\u093E\u0935\u093F\u0924 \u092C\u0930\u094D\u0916\u093E\u0938\u094D\u0924\u0917\u0940 \u092E\u0941\u0906\u0935\u091C\u0947 \u0938\u0947 \u0905\u0932\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0907\u0938\u0938\u0947 \u092C\u093F\u0928\u093E \u0909\u091A\u093F\u0924 \u0915\u093E\u0930\u0923 \u0915\u0947 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u0947 \u091C\u0941\u0921\u093C\u0947 \u092E\u0941\u0906\u0935\u091C\u093C\u0947 \u0938\u0947 \u092E\u093F\u0932\u0928\u0947 \u0935\u093E\u0932\u0947 \u0932\u093E\u092D\u094B\u0902 \u0915\u094B \u0905\u0932\u0917 \u0915\u0930\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u092E\u093F\u0932\u0924\u0940 \u0939\u0948\u0964"
                    },
                    {
                        es: "Si tu contrato tiene salario variable, comisiones, pagos no salariales o acuerdos especiales, usa el resultado como referencia y revisa tu caso con soporte laboral.",
                        en: "If your contract includes variable pay, commissions, non-salary payments, or special agreements, use the result as a reference and review your specific case with labor support.",
                        hi: "\u092F\u0926\u093F \u0906\u092A\u0915\u0947 \u0905\u0928\u0941\u092C\u0902\u0927 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0940\u092F \u0935\u0947\u0924\u0928, \u0915\u092E\u0940\u0936\u0928, \u0917\u0948\u0930-\u0935\u0947\u0924\u0928 \u092D\u0941\u0917\u0924\u093E\u0928 \u092F\u093E \u0935\u093F\u0936\u0947\u0937 \u0938\u092E\u091D\u094C\u0924\u0947 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902, \u0924\u094B \u092A\u0930\u093F\u0923\u093E\u092E \u0915\u094B \u0938\u0902\u0926\u0930\u094D\u092D \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0936\u094D\u0930\u092E \u0938\u0939\u093E\u092F\u0924\u093E \u0915\u0947 \u0938\u093E\u0925 \u0905\u092A\u0928\u0947 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u092E\u093E\u092E\u0932\u0947 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿A cuánto equivale la liquidación laboral?",
                    en: "What does an employment settlement include?",
                    hi: "\u0930\u094B\u091C\u0917\u093E\u0930 \u0938\u092E\u091D\u094C\u0924\u0947 \u092E\u0947\u0902 \u0915\u094D\u092F\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948?"
                },
                answer: {
                    es: "Depende de salario, fechas, prestaciones pendientes, vacaciones, motivo de terminación y si aplica indemnización. La calculadora separa esos conceptos para darte una estimación.",
                    en: "It depends on salary, dates, pending benefits, vacation, termination reason, and whether dismissal compensation applies. The calculator separates those items to estimate the payout.",
                    hi: "\u092F\u0939 \u0935\u0947\u0924\u0928, \u0924\u093E\u0930\u0940\u0916\u094B\u0902, \u0932\u0902\u092C\u093F\u0924 \u0932\u093E\u092D\u094B\u0902, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902, \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0915\u0947 \u0915\u093E\u0930\u0923 \u0914\u0930 \u0915\u094D\u092F\u093E \u092C\u0930\u094D\u0916\u093E\u0938\u094D\u0924\u0917\u0940 \u092E\u0941\u0906\u0935\u091C\u093E \u0932\u093E\u0917\u0942 \u0939\u094B\u0924\u093E \u0939\u0948, \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0909\u0928 \u0935\u0938\u094D\u0924\u0941\u0913\u0902 \u0915\u094B \u0905\u0932\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿La fecha de inicio siempre se usa?",
                    en: "Is the start date always used?",
                    hi: "\u0915\u094D\u092F\u093E \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0926\u093F\u0928\u093E\u0902\u0915 \u0915\u093E \u0939\u092E\u0947\u0936\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "Sí, sirve para estimar los días de relación laboral y, especialmente, para la indemnización cuando hay despido sin justa causa.",
                    en: "Yes. It helps estimate the duration of the employment relationship and, especially, dismissal compensation when there is termination without just cause.",
                    hi: "\u0939\u093E\u0901\u0964 \u092F\u0939 \u0930\u094B\u091C\u0917\u093E\u0930 \u0938\u0902\u092C\u0902\u0927 \u0915\u0940 \u0905\u0935\u0927\u093F \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930, \u0935\u093F\u0936\u0947\u0937 \u0930\u0942\u092A \u0938\u0947, \u092C\u093F\u0928\u093E \u0909\u091A\u093F\u0924 \u0915\u093E\u0930\u0923 \u0915\u0947 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u092A\u0930 \u092C\u0930\u094D\u0916\u093E\u0938\u094D\u0924\u0917\u0940 \u092E\u0941\u0906\u0935\u091C\u0947 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿La liquidación es el valor exacto que deben pagarme?",
                    en: "Is the settlement the exact amount I should be paid?",
                    hi: "\u0915\u094D\u092F\u093E \u0928\u093F\u092A\u091F\u093E\u0928 \u0935\u0939\u0940 \u0930\u093E\u0936\u093F \u0939\u0948 \u091C\u093F\u0938\u0915\u093E \u092E\u0941\u091D\u0947 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093F\u092F\u093E \u091C\u093E\u0928\u093E \u091A\u093E\u0939\u093F\u090F?"
                },
                answer: {
                    es: "No necesariamente. Es una estimación con reglas generales y puede cambiar según documentos, contrato y condiciones particulares.",
                    en: "Not necessarily. It is an estimate based on general rules and may change depending on documents, the contract, and specific conditions.",
                    hi: "\u0906\u0935\u0936\u094D\u092F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0928\u0939\u0940\u0902\u0964 \u092F\u0939 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0928\u093F\u092F\u092E\u094B\u0902 \u092A\u0930 \u0906\u0927\u093E\u0930\u093F\u0924 \u090F\u0915 \u0905\u0928\u0941\u092E\u093E\u0928 \u0939\u0948 \u0914\u0930 \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u094B\u0902, \u0905\u0928\u0941\u092C\u0902\u0927 \u0914\u0930 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0936\u0930\u094D\u0924\u094B\u0902 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u092C\u0926\u0932 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿Puedo calcular una liquidación de 2025?",
                    en: "Can I calculate a 2025 employment settlement?",
                    hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 2025 \u0930\u094B\u091C\u0917\u093E\u0930 \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?"
                },
                answer: {
                    es: "Sí, puedes elegir el año de reglas disponible. La herramienta usa ese año para valores legales como salario mínimo y auxilio de transporte cuando aplican.",
                    en: "Yes, you can choose an available rule year. The tool uses that year for legal values such as minimum wage and transport allowance when they apply.",
                    hi: "\u0939\u093E\u0902, \u0906\u092A \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 \u091C\u092C \u0935\u0947 \u0932\u093E\u0917\u0942 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902 \u0924\u094B \u0909\u092A\u0915\u0930\u0923 \u0928\u094D\u092F\u0942\u0928\u0924\u092E \u0935\u0947\u0924\u0928 \u0914\u0930 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u0947 \u091C\u0948\u0938\u0947 \u0915\u093E\u0928\u0942\u0928\u0940 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u0938 \u0935\u0930\u094D\u0937 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "social-benefits-colombia": {
        intro: {
            es: "Calcula prestaciones sociales en Colombia para un periodo específico: cesantías, intereses de cesantías, prima de servicios y vacaciones causadas.",
            en: "Calculate Colombia social benefits for a specific period: severance, severance interest, service bonus, and accrued vacation.",
            hi: "\u090F\u0915 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0905\u0935\u0927\u093F \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0938\u093E\u092E\u093E\u091C\u093F\u0915 \u0932\u093E\u092D\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902: \u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u0935\u093F\u091A\u094D\u091B\u0947\u0926 \u092C\u094D\u092F\u093E\u091C, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0914\u0930 \u0905\u0930\u094D\u091C\u093F\u0924 \u0905\u0935\u0915\u093E\u0936\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "La herramienta usa salario mensual bruto, fechas y año de reglas para estimar prestaciones proporcionales del periodo indicado.",
                        en: "The tool uses gross monthly salary, dates, and rule year to estimate proportional benefits for the selected period.",
                        hi: "\u091A\u092F\u0928\u093F\u0924 \u0905\u0935\u0927\u093F \u0915\u0947 \u0932\u093F\u090F \u0906\u0928\u0941\u092A\u093E\u0924\u093F\u0915 \u0932\u093E\u092D \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u0915\u0930\u0923 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928, \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0914\u0930 \u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Incluye el auxilio de transporte en cesantías y prima solo si activas la opción y el salario cumple el límite legal del año.",
                        en: "It includes transportation allowance in severance and service bonus only when enabled and when the salary meets that year's legal threshold.",
                        hi: "\u0907\u0938\u092E\u0947\u0902 \u0935\u093F\u091A\u094D\u091B\u0947\u0926 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u0914\u0930 \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0924\u092D\u0940 \u0936\u093E\u092E\u093F\u0932 \u0939\u094B\u0924\u093E \u0939\u0948 \u091C\u092C \u0938\u0915\u094D\u0937\u092E \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948 \u0914\u0930 \u091C\u092C \u0935\u0947\u0924\u0928 \u0909\u0938 \u0935\u0930\u094D\u0937 \u0915\u0940 \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u0940\u092E\u093E \u0915\u094B \u092A\u0942\u0930\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Diferencia con liquidación", en: "Difference from settlement", hi: "\u0928\u093F\u092A\u091F\u093E\u0928 \u0938\u0947 \u0905\u0902\u0924\u0930" },
                body: [
                    {
                        es: "Esta página no calcula indemnización ni salario pendiente por terminar un contrato. Sirve para estimar prestaciones acumuladas aunque el contrato siga activo.",
                        en: "This page does not calculate dismissal compensation or pending salary tied to ending a contract. It estimates accrued benefits even when employment continues.",
                        hi: "\u092F\u0939 \u092A\u0943\u0937\u094D\u0920 \u0915\u093F\u0938\u0940 \u0905\u0928\u0941\u092C\u0902\u0927 \u0915\u094B \u0938\u092E\u093E\u092A\u094D\u0924 \u0915\u0930\u0928\u0947 \u0938\u0947 \u091C\u0941\u0921\u093C\u0947 \u092C\u0930\u094D\u0916\u093E\u0938\u094D\u0924\u0917\u0940 \u092E\u0941\u0906\u0935\u091C\u0947 \u092F\u093E \u0932\u0902\u092C\u093F\u0924 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092F\u0939 \u0930\u094B\u091C\u0917\u093E\u0930 \u091C\u093E\u0930\u0940 \u0930\u0939\u0928\u0947 \u092A\u0930 \u092D\u0940 \u0905\u0930\u094D\u091C\u093F\u0924 \u0932\u093E\u092D \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Las vacaciones se calculan como causadas completas entre las fechas elegidas; no se restan vacaciones ya disfrutadas o pagadas.",
                        en: "Vacation is calculated as fully accrued between the selected dates; previously used or paid vacation is not subtracted.",
                        hi: "\u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u091A\u092F\u0928\u093F\u0924 \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u092A\u0942\u0930\u0940 \u0924\u0930\u0939 \u0938\u0947 \u0905\u0930\u094D\u091C\u093F\u0924 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0915\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948; \u092A\u0939\u0932\u0947 \u0909\u092A\u092F\u094B\u0917 \u0915\u0940 \u0917\u0908 \u092F\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u0917\u0908 \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u0915\u091F\u094C\u0924\u0940 \u0928\u0939\u0940\u0902 \u0915\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Qué salario debo ingresar?", en: "Which salary should I enter?", hi: "\u092E\u0941\u091D\u0947 \u0915\u094C\u0928 \u0938\u093E \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u093F\u090F?" },
                answer: {
                    es: "Ingresa el salario mensual bruto, antes de descuentos de salud, pensión u otros conceptos.",
                    en: "Enter the gross monthly salary, before health, pension, or other deductions.",
                    hi: "\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u092F\u093E \u0905\u0928\u094D\u092F \u0915\u091F\u094C\u0924\u093F\u092F\u094B\u0902 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "¿Para qué sirven las fechas?", en: "What are the dates for?", hi: "\u0924\u093E\u0930\u0940\u0916\u0947\u0902 \u0915\u093F\u0938 \u0932\u093F\u090F \u0939\u0948\u0902?" },
                answer: {
                    es: "Sirven para calcular los días del periodo que quieres estimar. No tienen que representar una terminación del contrato.",
                    en: "They calculate the days in the period you want to estimate. They do not have to represent contract termination.",
                    hi: "\u0935\u0947 \u0909\u0938 \u0905\u0935\u0927\u093F \u0915\u0947 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902 \u091C\u093F\u0938\u0915\u093E \u0906\u092A \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902\u0964 \u0909\u0928\u094D\u0939\u0947\u0902 \u0905\u0928\u0941\u092C\u0902\u0927 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0915\u093E \u092A\u094D\u0930\u0924\u093F\u0928\u093F\u0927\u093F\u0924\u094D\u0935 \u0915\u0930\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0928\u0939\u0940\u0902 \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Debo escribir el valor del auxilio de transporte?", en: "Do I need to enter the transportation allowance amount?", hi: "\u0915\u094D\u092F\u093E \u092E\u0941\u091D\u0947 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u0930\u093E\u0936\u093F \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La herramienta usa el valor legal del año de reglas y valida automáticamente si el salario cumple el límite.",
                    en: "No. The tool uses the legal value for the selected rule year and automatically checks whether the salary meets the threshold.",
                    hi: "\u0928\u0939\u0940\u0902, \u091F\u0942\u0932 \u091A\u092F\u0928\u093F\u0924 \u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u0928\u0942\u0928\u0940 \u092E\u0942\u0932\u094D\u092F \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u0938\u094D\u0935\u091A\u093E\u0932\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u091C\u093E\u0902\u091A\u0924\u093E \u0939\u0948 \u0915\u093F \u0935\u0947\u0924\u0928 \u0938\u0940\u092E\u093E \u0915\u094B \u092A\u0942\u0930\u093E \u0915\u0930\u0924\u093E \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902\u0964"
                }
            }
        ]
    },
    "credit-interest": {
        intro: {
            es: "Esta calculadora estima cuánto pagarías en intereses por un crédito antes de tomar una decisión de endeudamiento.",
            en: "This calculator estimates how much you would pay in interest on a loan before taking on debt.",
            hi: "\u092F\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948 \u0915\u093F \u090B\u0923 \u0932\u0947\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0906\u092A \u090B\u0923 \u092A\u0930 \u092C\u094D\u092F\u093E\u091C \u092E\u0947\u0902 \u0915\u093F\u0924\u0928\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902\u0917\u0947\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Usa el monto del préstamo, la tasa anual, el plazo en meses y el tipo de interés para estimar intereses totales y total a pagar.",
                        en: "It uses the loan amount, annual rate, term in months, and interest type to estimate total interest and the total amount paid.",
                        hi: "\u092F\u0939 \u0915\u0941\u0932 \u092C\u094D\u092F\u093E\u091C \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u0917\u0908 \u0915\u0941\u0932 \u0930\u093E\u0936\u093F \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090B\u0923 \u0930\u093E\u0936\u093F, \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0926\u0930, \u092E\u0939\u0940\u0928\u094B\u0902 \u092E\u0947\u0902 \u0905\u0935\u0927\u093F \u0914\u0930 \u092C\u094D\u092F\u093E\u091C \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Es útil para comparar escenarios simples antes de pedir un crédito, aceptar una oferta o revisar si una tasa te conviene.",
                        en: "It is useful for comparing simple scenarios before requesting a loan, accepting an offer, or checking whether a rate makes sense.",
                        hi: "\u092F\u0939 \u090B\u0923 \u0915\u093E \u0905\u0928\u0941\u0930\u094B\u0927 \u0915\u0930\u0928\u0947, \u0915\u093F\u0938\u0940 \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935 \u0915\u094B \u0938\u094D\u0935\u0940\u0915\u093E\u0930 \u0915\u0930\u0928\u0947, \u092F\u093E \u092F\u0939 \u091C\u093E\u0901\u091A\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0915\u093F \u0915\u094B\u0908 \u0926\u0930 \u0938\u093E\u0930\u094D\u0925\u0915 \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902, \u0938\u0930\u0932 \u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Qué no calcula", en: "What it does not calculate", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "No calcula una cuota fija amortizada. Para eso usa la calculadora de cuota de préstamo.",
                        en: "It does not calculate a fixed amortized payment. For that, use the loan payment calculator.",
                        hi: "\u092F\u0939 \u090F\u0915 \u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u092A\u0930\u093F\u0936\u094B\u0927\u0928 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0909\u0938\u0915\u0947 \u0932\u093F\u090F, \u090B\u0923 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Tampoco incluye seguros, comisiones, impuestos, cargos administrativos ni cambios de tasa.",
                        en: "It also does not include insurance, fees, taxes, administrative charges, or rate changes.",
                        hi: "\u0907\u0938\u092E\u0947\u0902 \u092C\u0940\u092E\u093E, \u0936\u0941\u0932\u094D\u0915, \u0915\u0930, \u092A\u094D\u0930\u0936\u093E\u0938\u0928\u093F\u0915 \u0936\u0941\u0932\u094D\u0915 \u092F\u093E \u0926\u0930 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u092D\u0940 \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿La tasa es anual o mensual?", en: "Is the rate annual or monthly?", hi: "\u0926\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0939\u0948 \u092F\u093E \u092E\u093E\u0938\u093F\u0915?" },
                answer: {
                    es: "El campo principal usa tasa anual. La herramienta la convierte según el tipo de interés elegido.",
                    en: "The main field uses an annual rate. The tool converts it according to the selected interest type.",
                    hi: "\u092E\u0941\u0916\u094D\u092F \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0926\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u091F\u0942\u0932 \u0907\u0938\u0947 \u091A\u092F\u0928\u093F\u0924 \u0930\u0941\u091A\u093F \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿Interés simple y compuesto dan lo mismo?",
                    en: "Do simple and compound interest produce the same result?",
                    hi: "\u0915\u094D\u092F\u093E \u0938\u093E\u0927\u093E\u0930\u0923 \u0914\u0930 \u091A\u0915\u094D\u0930\u0935\u0943\u0926\u094D\u0927\u093F \u092C\u094D\u092F\u093E\u091C \u0938\u092E\u093E\u0928 \u092A\u0930\u093F\u0923\u093E\u092E \u0926\u0947\u0924\u0947 \u0939\u0948\u0902?"
                },
                answer: {
                    es: "No. En el simple los intereses no generan nuevos intereses. En el compuesto, los intereses se acumulan según la capitalización.",
                    en: "No. With simple interest, interest does not generate additional interest. With compound interest, interest accumulates according to the compounding frequency.",
                    hi: "\u0928\u0939\u0940\u0902, \u0938\u093E\u0927\u093E\u0930\u0923 \u092C\u094D\u092F\u093E\u091C \u0915\u0947 \u0938\u093E\u0925, \u092C\u094D\u092F\u093E\u091C \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u092C\u094D\u092F\u093E\u091C \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u091A\u0915\u094D\u0930\u0935\u0943\u0926\u094D\u0927\u093F \u092C\u094D\u092F\u093E\u091C \u0915\u0947 \u0938\u093E\u0925, \u092C\u094D\u092F\u093E\u091C \u091A\u0915\u094D\u0930\u0935\u0943\u0926\u094D\u0927\u093F \u0906\u0935\u0943\u0924\u094D\u0924\u093F \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u091C\u092E\u093E \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿Esta calculadora me dice la cuota mensual?",
                    en: "Does this calculator show the monthly payment?",
                    hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u092E\u093E\u0938\u093F\u0915 \u092D\u0941\u0917\u0924\u093E\u0928 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "No. Esta calcula intereses totales. Para una cuota fija mensual usa la calculadora de cuota de préstamo.",
                    en: "No. This one calculates total interest. For a fixed monthly payment, use the loan payment calculator.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0915\u0941\u0932 \u092C\u094D\u092F\u093E\u091C \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u092E\u093E\u0938\u093F\u0915 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0947 \u0932\u093F\u090F, \u090B\u0923 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                }
            }
        ]
    },
    "loan-payment": {
        intro: {
            es: "Esta calculadora estima la cuota mensual de un préstamo con pagos fijos.",
            en: "This calculator estimates the monthly payment of a fixed-payment loan.",
            hi: "\u092F\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u092D\u0941\u0917\u0924\u093E\u0928 \u090B\u0923 \u0915\u0947 \u092E\u093E\u0938\u093F\u0915 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Para qué sirve", en: "What it is for", hi: "\u092F\u0939 \u0915\u093F\u0938 \u0932\u093F\u090F \u0939\u0948" },
                body: [
                    {
                        es: "Te ayuda a saber cuánto podrías pagar cada mes según el monto solicitado, la tasa y el plazo.",
                        en: "It helps you understand how much you might pay each month based on the requested amount, rate, and term.",
                        hi: "\u092F\u0939 \u0906\u092A\u0915\u094B \u092F\u0939 \u0938\u092E\u091D\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948 \u0915\u093F \u0906\u092A \u0905\u0928\u0941\u0930\u094B\u0927\u093F\u0924 \u0930\u093E\u0936\u093F, \u0926\u0930 \u0914\u0930 \u0905\u0935\u0927\u093F \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u0939\u0930 \u092E\u0939\u0940\u0928\u0947 \u0915\u093F\u0924\u0928\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "También muestra el total de intereses y el valor total estimado que terminarías pagando.",
                        en: "It also shows total interest and the estimated total amount you would end up paying.",
                        hi: "\u092F\u0939 \u0915\u0941\u0932 \u092C\u094D\u092F\u093E\u091C \u0914\u0930 \u0906\u092A\u0915\u0947 \u0926\u094D\u0935\u093E\u0930\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0940 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0915\u0941\u0932 \u0930\u093E\u0936\u093F \u0915\u094B \u092D\u0940 \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo interpretarla", en: "How to interpret it", hi: "\u0907\u0938\u0915\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "En un préstamo de cuota fija, cada cuota combina capital e intereses. Al inicio pagas más interés y con el tiempo más capital.",
                        en: "In a fixed-payment loan, each payment combines principal and interest. At the beginning you pay more interest, and over time more principal.",
                        hi: "\u090F\u0915 \u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u092D\u0941\u0917\u0924\u093E\u0928 \u090B\u0923 \u092E\u0947\u0902, \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u0942\u0932\u0927\u0928 \u0914\u0930 \u092C\u094D\u092F\u093E\u091C \u0915\u094B \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964 \u0936\u0941\u0930\u0941\u0906\u0924 \u092E\u0947\u0902 \u0906\u092A \u0905\u0927\u093F\u0915 \u092C\u094D\u092F\u093E\u091C \u0926\u0947\u0924\u0947 \u0939\u0948\u0902, \u0914\u0930 \u0938\u092E\u092F \u0915\u0947 \u0938\u093E\u0925 \u0905\u0927\u093F\u0915 \u092E\u0942\u0932\u0927\u0928 \u0926\u0947\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "El valor real puede cambiar si el banco incluye seguros, comisiones, cargos administrativos o una tasa distinta.",
                        en: "The real amount may change if the bank includes insurance, fees, administrative charges, or a different rate.",
                        hi: "\u092F\u0926\u093F \u092C\u0948\u0902\u0915 \u092C\u0940\u092E\u093E, \u0936\u0941\u0932\u094D\u0915, \u092A\u094D\u0930\u0936\u093E\u0938\u0928\u093F\u0915 \u0936\u0941\u0932\u094D\u0915 \u092F\u093E \u0915\u094B\u0908 \u092D\u093F\u0928\u094D\u0928 \u0926\u0930 \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0924\u093E \u0939\u0948 \u0924\u094B \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0930\u093E\u0936\u093F \u092C\u0926\u0932 \u0938\u0915\u0924\u0940 \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿La cuota siempre queda fija?", en: "Does the payment always stay fixed?", hi: "\u0915\u094D\u092F\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0938\u0926\u0948\u0935 \u0938\u094D\u0925\u093F\u0930 \u0930\u0939\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "En créditos de cuota fija sí se mantiene estable bajo las condiciones iniciales. Puede cambiar si la tasa es variable o hay cargos externos.",
                    en: "For fixed-payment loans, yes, it stays stable under the initial conditions. It may change if the rate is variable or if external charges apply.",
                    hi: "\u0928\u093F\u0936\u094D\u091A\u093F\u0924-\u092D\u0941\u0917\u0924\u093E\u0928 \u090B\u0923 \u0915\u0947 \u0932\u093F\u090F, \u0939\u093E\u0901, \u092F\u0939 \u092A\u094D\u0930\u093E\u0930\u0902\u092D\u093F\u0915 \u0936\u0930\u094D\u0924\u094B\u0902 \u0915\u0947 \u0924\u0939\u0924 \u0938\u094D\u0925\u093F\u0930 \u0930\u0939\u0924\u093E \u0939\u0948\u0964 \u092F\u0926\u093F \u0926\u0930 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0936\u0940\u0932 \u0939\u0948 \u092F\u093E \u092C\u093E\u0939\u0930\u0940 \u0936\u0941\u0932\u094D\u0915 \u0932\u093E\u0917\u0942 \u0939\u0948 \u0924\u094B \u092F\u0939 \u092C\u0926\u0932 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo usar tasa mensual?", en: "Can I use a monthly rate?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u092E\u093E\u0938\u093F\u0915 \u0926\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. La herramienta permite elegir si la tasa ingresada es anual o mensual.",
                    en: "Yes. The tool lets you choose whether the entered rate is annual or monthly.",
                    hi: "\u0939\u093E\u0901\u0964 \u091F\u0942\u0932 \u0906\u092A\u0915\u094B \u092F\u0939 \u091A\u0941\u0928\u0928\u0947 \u0926\u0947\u0924\u093E \u0939\u0948 \u0915\u093F \u0926\u0930\u094D\u091C \u0915\u0940 \u0917\u0908 \u0926\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0939\u0948 \u092F\u093E \u092E\u093E\u0938\u093F\u0915\u0964"
                }
            }
        ]
    },
    "cop-usd": {
        intro: {
            es: "Convierte pesos colombianos a dólares o dólares a pesos usando una tasa de referencia para calcular COP a USD y USD a COP.",
            en: "Convert Colombian pesos to US dollars or dollars to pesos with a reference rate for COP to USD and USD to COP estimates.",
            hi: "\u0938\u0902\u0926\u0930\u094D\u092D \u0935\u093F\u0928\u093F\u092E\u092F \u0926\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E\u0908 \u092A\u0947\u0938\u094B\u0938 \u0915\u094B \u0905\u092E\u0947\u0930\u093F\u0915\u0940 \u0921\u0949\u0932\u0930 \u092F\u093E \u0921\u0949\u0932\u0930 \u0915\u094B \u092A\u0947\u0938\u094B\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Cuándo usarlo", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Sirve para estimar compras internacionales, pagos, viajes, ahorros, facturas o valores expresados en dólares y pesos colombianos.",
                        en: "Use it to estimate international purchases, payments, travel, savings, invoices, or values expressed in Colombian pesos and US dollars.",
                        hi: "\u0905\u0902\u0924\u0930\u094D\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0916\u0930\u0940\u0926\u093E\u0930\u0940, \u092D\u0941\u0917\u0924\u093E\u0928, \u092F\u093E\u0924\u094D\u0930\u093E, \u092C\u091A\u0924, \u091A\u093E\u0932\u093E\u0928, \u092F\u093E \u0905\u092E\u0947\u0930\u093F\u0915\u0940 \u0921\u0949\u0932\u0930 \u092E\u0947\u0902 \u0935\u094D\u092F\u0915\u094D\u0924 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "La conversión usa una tasa de referencia y evita redondeos agresivos para conservar precisión.",
                        en: "The conversion uses a reference rate and avoids aggressive rounding so you keep more precision.",
                        hi: "\u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u090F\u0915 \u0938\u0902\u0926\u0930\u094D\u092D \u0926\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u0906\u0915\u094D\u0930\u093E\u092E\u0915 \u0917\u094B\u0932\u093E\u0908 \u0938\u0947 \u092C\u091A\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F \u0906\u092A \u0905\u0927\u093F\u0915 \u0938\u091F\u0940\u0915\u0924\u093E \u092C\u0928\u093E\u090F \u0930\u0916 \u0938\u0915\u0947\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Ten en cuenta", en: "Keep in mind", hi: "\u0927\u094D\u092F\u093E\u0928 \u0930\u0916\u0947\u0902" },
                body: [
                    {
                        es: "Tu banco, tarjeta, plataforma de pago o casa de cambio puede aplicar otra tasa.",
                        en: "Your bank, card, payment platform, or exchange house may apply a different rate.",
                        hi: "\u0906\u092A\u0915\u093E \u092C\u0948\u0902\u0915, \u0915\u093E\u0930\u094D\u0921, \u092D\u0941\u0917\u0924\u093E\u0928 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u092F\u093E \u090F\u0915\u094D\u0938\u091A\u0947\u0902\u091C \u0939\u093E\u0909\u0938 \u090F\u0915 \u0905\u0932\u0917 \u0926\u0930 \u0932\u093E\u0917\u0942 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También pueden existir comisiones, spreads, impuestos o cargos que no están incluidos en el cálculo.",
                        en: "There may also be fees, spreads, taxes, or charges that are not included in the calculation.",
                        hi: "\u0910\u0938\u0940 \u092B\u0940\u0938, \u0938\u094D\u092A\u094D\u0930\u0947\u0921, \u0915\u0930 \u092F\u093E \u0936\u0941\u0932\u094D\u0915 \u092D\u0940 \u0939\u094B \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u091C\u094B \u0917\u0923\u0928\u093E \u092E\u0947\u0902 \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿La TRM es igual a la tasa de mi banco?", en: "Is the reference rate the same as my bank's rate?", hi: "\u0915\u094D\u092F\u093E \u0938\u0902\u0926\u0930\u094D\u092D \u0926\u0930 \u092E\u0947\u0930\u0947 \u092C\u0948\u0902\u0915 \u0915\u0940 \u0926\u0930 \u0915\u0947 \u0938\u092E\u093E\u0928 \u0939\u0948?" },
                answer: {
                    es: "No siempre. La TRM es una referencia; cada entidad puede manejar una tasa propia.",
                    en: "Not always. The reference rate is just that: a reference. Each institution can use its own rate.",
                    hi: "\u0939\u092E\u0947\u0936\u093E \u0928\u0939\u0940\u0902\u0964 \u0938\u0902\u0926\u0930\u094D\u092D \u0926\u0930 \u092C\u0938 \u0907\u0924\u0928\u0940 \u0939\u0940 \u0939\u0948: \u090F\u0915 \u0938\u0902\u0926\u0930\u094D\u092D\u0964 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0938\u0902\u0938\u094D\u0925\u093E \u0905\u092A\u0928\u0940 \u0926\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930 \u0938\u0915\u0924\u0940 \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo convertir USD a COP?", en: "Can I convert USD to COP?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 USD \u0915\u094B COP \u092E\u0947\u0902 \u092C\u0926\u0932 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Cambia la dirección de conversión y escribe el monto en dólares.",
                    en: "Yes. Change the conversion direction and enter the amount in US dollars.",
                    hi: "\u0939\u093E\u0901\u0964 \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u0926\u093F\u0936\u093E \u092C\u0926\u0932\u0947\u0902 \u0914\u0930 \u0905\u092E\u0947\u0930\u093F\u0915\u0940 \u0921\u0949\u0932\u0930 \u092E\u0947\u0902 \u0930\u093E\u0936\u093F \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964"
                }
            }
        ]
    },
    "salary-increase": {
        intro: {
            es: "Calcula cómo queda un salario después de aplicar un aumento porcentual.",
            en: "Use this pay increase calculator to see what a salary looks like after applying a percentage raise.",
            hi: "\u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0935\u0943\u0926\u094D\u0927\u093F \u0932\u093E\u0917\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u092C\u093E\u0926 \u0935\u0947\u0924\u0928 \u0915\u0948\u0938\u093E \u0926\u093F\u0916\u0947\u0917\u093E\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "La herramienta toma el salario actual y el porcentaje de aumento para estimar el nuevo salario mensual.",
                        en: "The tool takes the current salary and increase percentage to estimate the new monthly salary.",
                        hi: "\u0928\u090F \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091F\u0942\u0932 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0935\u0943\u0926\u094D\u0927\u093F \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0932\u0947\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También muestra el valor exacto del aumento, el nuevo salario bruto, el salario neto con descuentos Colombia cuando los activas y la diferencia anual si ese aumento se mantiene durante doce meses.",
                        en: "It also shows the exact increase amount, the new gross salary, the net salary with Colombia deductions when enabled, and the annual difference if that raise stays in place for twelve months.",
                        hi: "\u092F\u0939 \u0938\u091F\u0940\u0915 \u0935\u0943\u0926\u094D\u0927\u093F \u0930\u093E\u0936\u093F, \u0928\u092F\u093E \u0938\u0915\u0932 \u0935\u0947\u0924\u0928, \u0938\u0915\u094D\u0937\u092E \u0939\u094B\u0928\u0947 \u092A\u0930 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0914\u0930 \u092F\u0926\u093F \u0935\u0939 \u0935\u0943\u0926\u094D\u0927\u093F \u092C\u093E\u0930\u0939 \u092E\u0939\u0940\u0928\u0947 \u0924\u0915 \u092C\u0928\u0940 \u0930\u0939\u0924\u0940 \u0939\u0948 \u0924\u094B \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0905\u0902\u0924\u0930 \u092D\u0940 \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarla", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Sirve para revisar propuestas de aumento salarial, comparar escenarios o entender cuánto representa un porcentaje sobre tu sueldo.",
                        en: "Use it to review pay increase or salary raise proposals, compare scenarios, or understand what a percentage means on your pay.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0935\u0947\u0924\u0928 \u0935\u0943\u0926\u094D\u0927\u093F \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935\u094B\u0902 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0947, \u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947, \u092F\u093E \u092F\u0939 \u0938\u092E\u091D\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u0947\u0902 \u0915\u093F \u0906\u092A\u0915\u0947 \u0935\u0947\u0924\u0928 \u092A\u0930 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u093E \u0915\u094D\u092F\u093E \u0905\u0930\u094D\u0925 \u0939\u0948\u0964"
                    },
                    {
                        es: "Puede estimar descuentos de salud, pensión y Fondo de Solidaridad para Colombia. No incluye retención en la fuente, auxilios, bonificaciones ni reglas internas de la empresa.",
                        en: "It can estimate health, pension, and solidarity fund deductions for Colombia. It does not include withholding tax, allowances, bonuses, or company-specific rules.",
                        hi: "\u092F\u0939 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0915\u091F\u094C\u0924\u0940 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964 \u0907\u0938\u092E\u0947\u0902 \u0935\u093F\u0926\u0939\u094B\u0932\u094D\u0921\u093F\u0902\u0917 \u091F\u0948\u0915\u094D\u0938, \u092D\u0924\u094D\u0924\u0947, \u092C\u094B\u0928\u0938 \u092F\u093E \u0915\u0902\u092A\u0928\u0940-\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0928\u093F\u092F\u092E \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo calcular un aumento salarial?", en: "How do I use a pay increase calculator?", hi: "\u092E\u0948\u0902 \u0935\u0947\u0924\u0928 \u0935\u0943\u0926\u094D\u0927\u093F \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Ingresa el salario actual y el porcentaje de aumento. La calculadora multiplica el salario por ese porcentaje y suma el resultado al salario actual.",
                    en: "Enter the current salary and increase percentage. The calculator multiplies the salary by that percentage and adds the result to the current salary.",
                    hi: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 \u0914\u0930 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u092C\u0922\u093C\u093E\u090F\u0902\u0964 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0909\u0938 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0938\u0947 \u0935\u0947\u0924\u0928 \u0915\u094B \u0917\u0941\u0923\u093E \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u092A\u0930\u093F\u0923\u093E\u092E \u0915\u094B \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0935\u0947\u0924\u0928 \u092E\u0947\u0902 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El resultado es salario neto?", en: "Is the result net salary?", hi: "\u0915\u094D\u092F\u093E \u092A\u0930\u093F\u0923\u093E\u092E \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0939\u0948?" },
                answer: {
                    es: "La calculadora muestra el salario bruto. Si activas los descuentos de nómina Colombia, también estima el salario neto después de salud, pensión y Fondo de Solidaridad cuando aplique.",
                    en: "The calculator shows the gross salary. If you enable Colombia payroll deductions, it also estimates the net salary after health, pension, and solidarity fund when applicable.",
                    hi: "\u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0938\u0915\u0932 \u0935\u0947\u0924\u0928 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948. \u092F\u0926\u093F \u0906\u092A \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0938\u0915\u094D\u0937\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0924\u094B \u092F\u0939 \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0915\u0947 \u092C\u093E\u0926 \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0915\u093E \u092D\u0940 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "worked-hours": {
        intro: {
            es: "Esta calculadora de horas trabajadas suma jornadas por día, turno, semana o periodo para saber cuánto tiempo trabajaste en total y cómo calcular horas de trabajo.",
            en: "This worked hours calculator adds daily, shift, weekly, or period work entries so you can see the total time worked.",
            hi: "\u092F\u0939 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0926\u0948\u0928\u093F\u0915, \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u092F\u093E \u0905\u0935\u0927\u093F \u0915\u093E\u0930\u094D\u092F \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F \u0906\u092A \u0915\u093E\u092E \u0915\u093F\u090F \u0917\u090F \u0915\u0941\u0932 \u0938\u092E\u092F \u0915\u094B \u0926\u0947\u0916 \u0938\u0915\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué puedes calcular", en: "What you can calculate", hi: "\u0906\u092A \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902" },
                body: [
                    {
                        es: "Agrega una o varias jornadas con fecha, hora de inicio y hora de finalización para sumar horas trabajadas, horas laborales, turnos y descansos sin hacer cuentas manuales.",
                        en: "Add one or more work entries with date, start time, and end time to add worked hours, labor hours, shifts, and breaks without manual math.",
                        hi: "\u092E\u0948\u0928\u094D\u092F\u0941\u0905\u0932 \u0917\u0923\u093F\u0924 \u0915\u0947 \u092C\u093F\u0928\u093E \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947, \u0936\u094D\u0930\u092E \u0918\u0902\u091F\u0947 \u092F\u093E \u0936\u093F\u092B\u094D\u091F \u091C\u094B\u0921\u093C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0926\u093F\u0928\u093E\u0902\u0915, \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0938\u092E\u092F \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u0915\u0947 \u0938\u093E\u0925 \u090F\u0915 \u092F\u093E \u0905\u0927\u093F\u0915 \u0915\u093E\u0930\u094D\u092F \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901 \u091C\u094B\u0921\u093C\u0947\u0902\u0964"
                    },
                    {
                        es: "La herramienta suma los minutos y los presenta como horas totales, minutos totales y tiempo trabajado por cada jornada.",
                        en: "The tool totals the minutes and shows total hours, total minutes, and worked time for each entry.",
                        hi: "\u0909\u092A\u0915\u0930\u0923 \u092E\u093F\u0928\u091F\u094B\u0902 \u0915\u093E \u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0915\u0947 \u0932\u093F\u090F \u0915\u0941\u0932 \u0918\u0902\u091F\u0947, \u0915\u0941\u0932 \u092E\u093F\u0928\u091F \u0914\u0930 \u0915\u093E\u0930\u094D\u092F \u0938\u092E\u092F \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Para qué sirve", en: "What it is for", hi: "\u092F\u0939 \u0915\u093F\u0938 \u0932\u093F\u090F \u0939\u0948" },
                body: [
                    {
                        es: "Es útil para calcular mis horas de trabajo, sumar horas trabajadas, preparar reportes, cobrar por hora, controlar tiempo y revisar jornadas laborales.",
                        en: "Use it as a work hours calculator for reports, hourly billing, time card review, personal time tracking, and work shift checks.",
                        hi: "\u092F\u0939 \u092E\u0947\u0930\u0947 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947, \u0930\u093F\u092A\u094B\u0930\u094D\u091F, \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u092C\u093F\u0932\u093F\u0902\u0917, \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0938\u092E\u092F \u091F\u094D\u0930\u0948\u0915\u093F\u0902\u0917 \u0914\u0930 \u0915\u093E\u0930\u094D\u092F \u0936\u093F\u092B\u094D\u091F \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    },
                    {
                        es: "No evalúa recargos, horas extra legales, festivos ni reglas laborales especiales.",
                        en: "It does not evaluate surcharges, legal overtime, holidays, or special labor rules.",
                        hi: "\u092F\u0939 \u0905\u0927\u093F\u092D\u093E\u0930, \u0915\u093E\u0928\u0942\u0928\u0940 \u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902 \u092F\u093E \u0935\u093F\u0936\u0947\u0937 \u0936\u094D\u0930\u092E \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u093E \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Ejemplo de uso", en: "Example use", hi: "\u0909\u0926\u093E\u0939\u0930\u0923 \u092A\u094D\u0930\u092F\u094B\u0917" },
                body: [
                    {
                        es: "Si trabajaste de 8:00 a. m. a 5:00 p. m., agrega esa jornada y la herramienta calcula las horas de trabajo del día.",
                        en: "If you worked from 8:00 a.m. to 5:00 p.m., add that entry and the tool calculates the work hours for that day.",
                        hi: "\u092F\u0926\u093F \u0906\u092A\u0928\u0947 \u0938\u0941\u092C\u0939 8:00 \u092C\u091C\u0947 \u0938\u0947 \u0936\u093E\u092E 5:00 \u092C\u091C\u0947 \u0924\u0915 \u0915\u093E\u092E \u0915\u093F\u092F\u093E \u0939\u0948, \u0924\u094B \u0909\u0938 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0915\u094B \u091C\u094B\u0921\u093C\u0947\u0902 \u0914\u0930 \u091F\u0942\u0932 \u0909\u0938 \u0926\u093F\u0928 \u0915\u0947 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Si tienes varios días, crea una jornada por cada fecha para obtener el total acumulado.",
                        en: "If you have several days, create one entry for each date to get the accumulated total.",
                        hi: "\u092F\u0926\u093F \u0906\u092A\u0915\u0947 \u092A\u093E\u0938 \u0915\u0908 \u0926\u093F\u0928 \u0939\u0948\u0902, \u0924\u094B \u0938\u0902\u091A\u093F\u0924 \u0915\u0941\u0932 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0924\u093F\u0925\u093F \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u092C\u0928\u093E\u090F\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo sumar horas trabajadas?", en: "How do I add worked hours?", hi: "\u092E\u0948\u0902 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947 \u0915\u0948\u0938\u0947 \u091C\u094B\u0921\u093C\u0942\u0901?" },
                answer: {
                    es: "Crea una jornada por cada día o turno con hora de inicio y finalización. La calculadora suma todos los rangos y muestra horas, minutos y total acumulado.",
                    en: "Create one entry for each day or shift with start and end time. The calculator adds all ranges and shows hours, minutes, and the accumulated total.",
                    hi: "\u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0926\u093F\u0928 \u092F\u093E \u0936\u093F\u092B\u094D\u091F \u0915\u0947 \u0932\u093F\u090F \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u0915\u0947 \u0938\u093E\u0925 \u090F\u0915 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u092C\u0928\u093E\u090F\u0902\u0964 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0938\u092D\u0940 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u094B\u0902 \u0915\u094B \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948 \u0914\u0930 \u0938\u0902\u091A\u093F\u0924 \u0915\u0941\u0932 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo sumar varias jornadas?", en: "Can I add multiple work entries?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u090F\u0915\u093E\u0927\u093F\u0915 \u0915\u093E\u0930\u094D\u092F \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901 \u091C\u094B\u0921\u093C \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Agrega todos los rangos que necesites y la herramienta los suma.",
                    en: "Yes. Add as many entries as you need and the tool will total them.",
                    hi: "\u0939\u093E\u0901\u0964 \u091C\u093F\u0924\u0928\u0940 \u0906\u092A\u0915\u094B \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B \u0909\u0924\u0928\u0940 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901 \u091C\u094B\u0921\u093C\u0947\u0902 \u0914\u0930 \u091F\u0942\u0932 \u0909\u0928\u094D\u0939\u0947\u0902 \u092A\u0942\u0930\u093E \u0915\u0930 \u0926\u0947\u0917\u093E\u0964"
                }
            },
            {
                question: { es: "¿Calcula horas extra?", en: "Does it calculate overtime?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Solo suma tiempo trabajado; los recargos dependen de reglas laborales y acuerdos específicos.",
                    en: "No. It only adds worked time; overtime surcharges depend on labor rules and specific agreements.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0915\u0947\u0935\u0932 \u0915\u093E\u092E \u0915\u093E \u0938\u092E\u092F \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948; \u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0905\u0927\u093F\u092D\u093E\u0930 \u0936\u094D\u0930\u092E \u0928\u093F\u092F\u092E\u094B\u0902 \u0914\u0930 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0938\u092E\u091D\u094C\u0924\u094B\u0902 \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: { es: "¿Cómo calcular horas de trabajo diarias?", en: "How do I calculate daily work hours?", hi: "\u092E\u0948\u0902 \u0926\u0948\u0928\u093F\u0915 \u0915\u093E\u0930\u094D\u092F \u0918\u0902\u091F\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Selecciona la fecha, escribe la hora de inicio y la hora de finalización. La calculadora resta esos tiempos y suma el resultado con las demás jornadas.",
                    en: "Choose the date, enter the start time and end time. The calculator subtracts those times and adds the result to the other entries.",
                    hi: "\u0926\u093F\u0928\u093E\u0902\u0915 \u091A\u0941\u0928\u0947\u0902, \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0938\u092E\u092F \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0938\u092E\u092F \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0909\u0928 \u0938\u092E\u092F\u094B\u0902 \u0915\u094B \u0918\u091F\u093E\u0924\u093E \u0939\u0948 \u0914\u0930 \u092A\u0930\u093F\u0923\u093E\u092E \u0915\u094B \u0905\u0928\u094D\u092F \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "freelance-rate": {
        intro: {
            es: "Calcula una tarifa freelance estimada a partir de tu ingreso mensual deseado y tus horas de trabajo.",
            en: "Calculate an estimated freelance rate based on your target monthly income and working hours.",
            hi: "\u0905\u092A\u0928\u0940 \u0932\u0915\u094D\u0937\u093F\u0924 \u092E\u093E\u0938\u093F\u0915 \u0906\u092F \u0914\u0930 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u094B\u0902 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938 \u0926\u0930 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué pide", en: "What it asks for", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u092E\u093E\u0902\u0917\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Ingresa cuánto quieres ganar al mes, cuántos días trabajas por semana, cuántas horas al día y un margen de seguridad opcional.",
                        en: "Enter how much you want to earn per month, how many days you work per week, how many hours per day, and an optional safety margin.",
                        hi: "\u092F\u0939 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 \u0915\u093F \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u092E\u093E\u0939 \u0915\u093F\u0924\u0928\u093E \u0915\u092E\u093E\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902, \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u093F\u0924\u0928\u0947 \u0926\u093F\u0928 \u0915\u093E\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u092A\u094D\u0930\u0924\u093F \u0926\u093F\u0928 \u0915\u093F\u0924\u0928\u0947 \u0918\u0902\u091F\u0947 \u0914\u0930 \u090F\u0915 \u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u092E\u093E\u0930\u094D\u091C\u093F\u0928\u0964"
                    },
                    {
                        es: "Con esos datos estima tarifa por hora, por día, por semana y el ingreso mensual objetivo.",
                        en: "With that information, it estimates an hourly, daily, and weekly rate plus the target monthly revenue.",
                        hi: "\u0909\u0938 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0915\u0947 \u0938\u093E\u0925, \u092F\u0939 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E, \u0926\u0948\u0928\u093F\u0915 \u0914\u0930 \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0926\u0930 \u0914\u0930 \u0932\u0915\u094D\u0937\u094D\u092F \u092E\u093E\u0938\u093F\u0915 \u0930\u093E\u091C\u0938\u094D\u0935 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usar el resultado", en: "How to use the result", hi: "\u092A\u0930\u093F\u0923\u093E\u092E \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Úsalo como punto de partida para cotizar proyectos o comparar si una oferta freelance te conviene.",
                        en: "Use it as a starting point to quote projects or compare whether a freelance offer works for you.",
                        hi: "\u0907\u0938\u0947 \u092A\u0930\u093F\u092F\u094B\u091C\u0928\u093E\u0913\u0902 \u0915\u094B \u0909\u0926\u094D\u0927\u0943\u0924 \u0915\u0930\u0928\u0947 \u092F\u093E \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u092C\u093F\u0902\u0926\u0941 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902 \u0915\u093F \u0915\u094B\u0908 \u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938 \u0911\u092B\u0930 \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902\u0964"
                    },
                    {
                        es: "La tarifa final puede cambiar por experiencia, urgencia, complejidad, cliente, impuestos y mercado.",
                        en: "The final rate may vary because of experience, urgency, complexity, client type, taxes, and market conditions.",
                        hi: "\u0905\u0902\u0924\u093F\u092E \u0926\u0930 \u0905\u0928\u0941\u092D\u0935, \u0924\u093E\u0924\u094D\u0915\u093E\u0932\u093F\u0915\u0924\u093E, \u091C\u091F\u093F\u0932\u0924\u093E, \u0917\u094D\u0930\u093E\u0939\u0915 \u092A\u094D\u0930\u0915\u093E\u0930, \u0915\u0930\u094B\u0902 \u0914\u0930 \u092C\u093E\u091C\u093C\u093E\u0930 \u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0915\u093E\u0930\u0923 \u092D\u093F\u0928\u094D\u0928 \u0939\u094B \u0938\u0915\u0924\u0940 \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿La herramienta descuenta impuestos?", en: "Does the tool subtract taxes?", hi: "\u0915\u094D\u092F\u093E \u0909\u092A\u0915\u0930\u0923 \u0915\u0930 \u0918\u091F\u093E\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Calcula una tarifa base estimada. Cada persona debe revisar sus obligaciones reales.",
                    en: "No. It calculates an estimated base rate. Each person should review their own tax obligations.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0906\u0927\u093E\u0930 \u0926\u0930 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0935\u094D\u092F\u0915\u094D\u0924\u093F \u0915\u094B \u0905\u092A\u0928\u0947 \u0915\u0930 \u0926\u093E\u092F\u093F\u0924\u094D\u0935\u094B\u0902 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964"
                }
            },
            {
                question: { es: "¿Qué es el margen de seguridad?", en: "What is the safety margin?", hi: "\u0938\u0941\u0930\u0915\u094D\u0937\u093E \u092E\u093E\u0930\u094D\u091C\u093F\u0928 \u0915\u094D\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "Es un porcentaje adicional para cubrir imprevistos, negociación, tiempos muertos o variaciones del proyecto.",
                    en: "It is an extra percentage to cover uncertainty, negotiation, downtime, or project changes.",
                    hi: "\u092F\u0939 \u0905\u0928\u093F\u0936\u094D\u091A\u093F\u0924\u0924\u093E, \u092C\u093E\u0924\u091A\u0940\u0924, \u0921\u093E\u0909\u0928\u091F\u093E\u0907\u092E \u092F\u093E \u092A\u094D\u0930\u094B\u091C\u0947\u0915\u094D\u091F \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u094B\u0902 \u0915\u094B \u0915\u0935\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0939\u0948\u0964"
                }
            }
        ]
    },
    "days-between-dates": {
        intro: {
            es: "Cuenta cuántos días calendario hay entre dos fechas para trámites, viajes, entregas, planeación o conteos rápidos en Colombia.",
            en: "Count how many calendar days there are between two dates for paperwork, trips, deliveries, or planning.",
            hi: "\u0917\u093F\u0928\u0947\u0902 \u0915\u093F \u0915\u093E\u0917\u091C\u0940 \u0915\u093E\u0930\u094D\u0930\u0935\u093E\u0908, \u092F\u093E\u0924\u094D\u0930\u093E\u0913\u0902, \u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u092F\u093E \u092F\u094B\u091C\u0928\u093E \u0915\u0947 \u0932\u093F\u090F \u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u093F\u0924\u0928\u0947 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928 \u0939\u0948\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué muestra", en: "What it shows", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Entrega el total de días calendario, semanas completas y días restantes entre la fecha inicial y la final.",
                        en: "It returns the total number of calendar days, full weeks, and remaining days between the start and end dates.",
                        hi: "\u092F\u0939 \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902, \u092A\u0942\u0930\u0947 \u0938\u092A\u094D\u0924\u093E\u0939\u094B\u0902 \u0914\u0930 \u0936\u0947\u0937 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0915\u0941\u0932 \u0938\u0902\u0916\u094D\u092F\u093E \u0932\u094C\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Puedes elegir si quieres incluir la fecha final en el conteo, algo útil cuando necesitas contar ambos días.",
                        en: "You can choose whether to include the end date in the count, which is useful when both dates should count.",
                        hi: "\u0906\u092A \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u0905\u0902\u0924\u093F\u092E \u0924\u093F\u0925\u093F \u0915\u094B \u0917\u093F\u0928\u0924\u0940 \u092E\u0947\u0902 \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0928\u093E \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902, \u091C\u094B \u0924\u092C \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u094B\u0924\u093E \u0939\u0948 \u091C\u092C \u0926\u094B\u0928\u094B\u0902 \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0940 \u091C\u093E\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964"
                    }
                ]
            },
            {
                title: { es: "Usos comunes", en: "Common uses", hi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0909\u092A\u092F\u094B\u0917" },
                body: [
                    {
                        es: "Sirve como calculador de días para plazos personales, duración de viajes, periodos entre eventos, días calendario en Colombia o tiempo restante para una entrega.",
                        en: "It is useful for personal deadlines, trip duration, time between events, calendar day counts, or the time left until a delivery.",
                        hi: "\u092F\u0939 \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0938\u092E\u092F \u0938\u0940\u092E\u093E, \u092F\u093E\u0924\u094D\u0930\u093E \u0915\u0940 \u0905\u0935\u0927\u093F, \u0918\u091F\u0928\u093E\u0913\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u093E \u0938\u092E\u092F, \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940, \u092F\u093E \u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u0924\u0915 \u092C\u091A\u0947 \u0938\u092E\u092F \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    },
                    {
                        es: "No interpreta días hábiles, festivos, vencimientos legales ni reglas de entidades.",
                        en: "It does not interpret business days, holidays, legal deadlines, or institution-specific rules.",
                        hi: "\u092F\u0939 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902, \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u092E\u092F-\u0938\u0940\u092E\u093E \u092F\u093E \u0938\u0902\u0938\u094D\u0925\u093E\u0928-\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo calcular días entre dos fechas?", en: "How do I calculate days between two dates?", hi: "\u092E\u0948\u0902 \u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Selecciona la fecha inicial y la fecha final. La herramienta calcula los días calendario entre ambas y puede incluir la fecha final si necesitas contar ambos extremos.",
                    en: "Select the start date and end date. The tool calculates calendar days between them and can include the end date when both endpoints should count.",
                    hi: "\u0906\u0930\u0902\u092D \u0924\u093F\u0925\u093F \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F \u091A\u0941\u0928\u0947\u0902. \u0909\u092A\u0915\u0930\u0923 \u0909\u0928\u0915\u0947 \u092C\u0940\u091A \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u0905\u0902\u0924\u093F\u092E \u0924\u093F\u0925\u093F \u0936\u093E\u092E\u093F\u0932 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948 \u091C\u092C \u0926\u094B\u0928\u094B\u0902 \u0938\u092E\u093E\u092A\u0928 \u092C\u093F\u0902\u0926\u0941\u0913\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0940 \u091C\u093E\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964"
                }
            },
            {
                question: { es: "¿Cuenta días hábiles?", en: "Does it count business days?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Cuenta días calendario.",
                    en: "No. It counts calendar days.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Qué significa incluir la fecha final?", en: "What does including the end date mean?", hi: "\u0905\u0902\u0924\u093F\u092E \u0924\u093F\u0925\u093F \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0928\u0947 \u0915\u093E \u0915\u094D\u092F\u093E \u092E\u0924\u0932\u092C \u0939\u0948?" },
                answer: {
                    es: "Suma un día adicional cuando quieres contar tanto el día inicial como el día final.",
                    en: "It adds one more day when you want to count both the first day and the final day.",
                    hi: "\u092F\u0939 \u090F\u0915 \u0914\u0930 \u0926\u093F\u0928 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948 \u091C\u092C \u0906\u092A \u092A\u0939\u0932\u0947 \u0926\u093F\u0928 \u0914\u0930 \u0905\u0902\u0924\u093F\u092E \u0926\u093F\u0928 \u0926\u094B\u0928\u094B\u0902 \u0915\u094B \u0917\u093F\u0928\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: { es: "¿Sirve como calculador de días para trámites?", en: "Can I use it as a day counter for paperwork?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0907\u0938\u0947 \u0915\u093E\u0917\u091C\u0940 \u0915\u093E\u0930\u094D\u0930\u0935\u093E\u0908 \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0926\u093F\u0935\u0938\u0940\u092F \u0915\u093E\u0909\u0902\u091F\u0930 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0902?" },
                answer: {
                    es: "Sí, sirve como referencia de días calendario. Si el trámite depende de días hábiles, festivos o reglas legales, revisa la norma específica.",
                    en: "Yes, it works as a calendar day reference. If paperwork depends on business days, holidays, or legal rules, check the specific rule.",
                    hi: "\u0939\u093E\u0901, \u092F\u0939 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0935\u0938 \u0938\u0902\u0926\u0930\u094D\u092D \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0915\u093E\u0930\u094D\u092F \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092F\u0926\u093F \u0915\u093E\u0917\u091C\u0940 \u0915\u093E\u0930\u094D\u0930\u0935\u093E\u0908 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902 \u092F\u093E \u0915\u093E\u0928\u0942\u0928\u0940 \u0928\u093F\u092F\u092E\u094B\u0902 \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u0940 \u0939\u0948, \u0924\u094B \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0928\u093F\u092F\u092E \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0930\u0947\u0902\u0964"
                }
            }
        ]
    },
    "weeks-between-dates": {
        intro: {
            es: "Calcula cuantas semanas hay entre dos fechas y convierte el periodo en semanas completas, dias restantes y dias calendario.",
            en: "Calculate how many weeks are between two dates and convert the period into full weeks, remaining days, and calendar days.",
            hi: "\u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u093F\u0924\u0928\u0947 \u0938\u092A\u094D\u0924\u093E\u0939 \u0939\u0948\u0902 \u0914\u0930 \u0905\u0935\u0927\u093F \u0915\u094B \u092A\u0942\u0930\u094D\u0923 \u0938\u092A\u094D\u0924\u093E\u0939, \u0936\u0947\u0937 \u0926\u093F\u0928 \u0914\u0930 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Que muestra", en: "What it shows", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Entrega semanas aproximadas, semanas completas, dias restantes y total de dias calendario entre la fecha inicial y la fecha final.",
                        en: "It returns approximate weeks, full weeks, remaining days, and total calendar days between the start and end dates.",
                        hi: "\u092F\u0939 \u092A\u094D\u0930\u093E\u0930\u0902\u092D \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0938\u092A\u094D\u0924\u093E\u0939, \u092A\u0942\u0930\u094D\u0923 \u0938\u092A\u094D\u0924\u093E\u0939, \u0936\u0947\u0937 \u0926\u093F\u0928 \u0914\u0930 \u0915\u0941\u0932 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928 \u0932\u094C\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Puedes elegir si quieres incluir la fecha final cuando necesitas contar ambos extremos del periodo.",
                        en: "You can choose whether to include the end date when both endpoints should count.",
                        hi: "\u0906\u092A \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u0905\u0902\u0924\u093F\u092E \u0924\u093F\u0925\u093F \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0928\u0940 \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902, \u091C\u092C \u0926\u094B\u0928\u094B\u0902 \u0938\u092E\u093E\u092A\u0928 \u092C\u093F\u0902\u0926\u0941\u0913\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0940 \u091C\u093E\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964"
                    }
                ]
            },
            {
                title: { es: "Usos comunes", en: "Common uses", hi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0909\u092A\u092F\u094B\u0917" },
                body: [
                    {
                        es: "Sirve para planes de estudio, proyectos, viajes, entregas, rutinas, embarazo, eventos o conteos rapidos por semanas.",
                        en: "It helps with study plans, projects, trips, deliveries, routines, pregnancy, events, or quick week-based counts.",
                        hi: "\u092F\u0939 \u0905\u0927\u094D\u092F\u092F\u0928 \u092F\u094B\u091C\u0928\u093E\u0913\u0902, \u092A\u0930\u093F\u092F\u094B\u091C\u0928\u093E\u0913\u0902, \u092F\u093E\u0924\u094D\u0930\u093E\u0913\u0902, \u092A\u094D\u0930\u0938\u0935, \u0926\u093F\u0928\u091A\u0930\u094D\u092F\u093E, \u0917\u0930\u094D\u092D\u093E\u0935\u0938\u094D\u0925\u093E, \u0918\u091F\u0928\u093E\u0913\u0902 \u092F\u093E \u0924\u094D\u0935\u0930\u093F\u0924 \u0938\u092A\u094D\u0924\u093E\u0939-\u0906\u0927\u093E\u0930\u093F\u0924 \u0917\u093F\u0928\u0924\u0940 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "No interpreta dias habiles, festivos, vencimientos legales ni reglas de entidades.",
                        en: "It does not interpret business days, holidays, legal deadlines, or institution-specific rules.",
                        hi: "\u092F\u0939 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902, \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u092E\u092F-\u0938\u0940\u092E\u093E \u092F\u093E \u0938\u0902\u0938\u094D\u0925\u093E\u0928-\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "Como calcular semanas entre dos fechas?", en: "How do I calculate weeks between two dates?", hi: "\u092E\u0948\u0902 \u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0938\u092A\u094D\u0924\u093E\u0939\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Selecciona la fecha inicial y la fecha final. La herramienta calcula el total de dias y lo convierte a semanas aproximadas, semanas completas y dias restantes.",
                    en: "Select the start date and end date. The tool calculates total days and converts them into approximate weeks, full weeks, and remaining days.",
                    hi: "\u0906\u0930\u0902\u092D \u0924\u093F\u0925\u093F \u0914\u0930 \u0938\u092E\u093E\u092A\u094D\u0924\u093F \u0924\u093F\u0925\u093F \u091A\u0941\u0928\u0947\u0902. \u0909\u092A\u0915\u0930\u0923 \u0915\u0941\u0932 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u0909\u0928\u094D\u0939\u0947\u0902 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0938\u092A\u094D\u0924\u093E\u0939, \u092A\u0942\u0930\u094D\u0923 \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0936\u0947\u0937 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "Cuenta la fecha final?", en: "Does it count the end date?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0905\u0902\u0924\u093F\u092E \u0924\u093F\u0925\u093F \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "Solo si activas la opcion de incluir fecha final. Esto suma un dia al conteo.",
                    en: "Only if you enable the include end date option. That adds one day to the count.",
                    hi: "\u0915\u0947\u0935\u0932 \u0924\u092D\u0940 \u091C\u092C \u0906\u092A \u0905\u0902\u0924\u093F\u092E \u0924\u093F\u0925\u093F \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0928\u0947 \u0915\u093E \u0935\u093F\u0915\u0932\u094D\u092A \u0938\u0915\u094D\u0937\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964 \u0907\u0938\u0938\u0947 \u0917\u093F\u0928\u0924\u0940 \u092E\u0947\u0902 \u090F\u0915 \u0926\u093F\u0928 \u091C\u0941\u0921\u093C \u091C\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "Cuenta dias habiles?", en: "Does it count business days?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Cuenta dias calendario y los convierte a semanas.",
                    en: "No. It counts calendar days and converts them into weeks.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u0915\u094B \u0917\u093F\u0928\u0924\u093E \u0939\u0948 \u0914\u0930 \u0909\u0928\u094D\u0939\u0947\u0902 \u0938\u092A\u094D\u0924\u093E\u0939\u094B\u0902 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "days-until-date": {
        intro: {
            es: "Cuenta cuántos días faltan para una fecha futura, evento, entrega o plazo personal, con resultado claro en días y semanas.",
            en: "Use this days until calculator to count how many days are left until a future date, event, delivery, or personal deadline, like a simple days till date counter.",
            hi: "\u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916, \u0918\u091F\u0928\u093E, \u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u092F\u093E \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0938\u092E\u092F \u0938\u0940\u092E\u093E \u0924\u0915 \u0915\u093F\u0924\u0928\u0947 \u0926\u093F\u0928 \u092C\u091A\u0947 \u0939\u0948\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué muestra", en: "What it shows", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Entrega días calendario restantes, semanas aproximadas, semanas completas y días sobrantes hasta la fecha objetivo.",
                        en: "It returns calendar days left, approximate weeks, full weeks, and remaining days until the target date.",
                        hi: "\u092F\u0939 \u0932\u0915\u094D\u0937\u094D\u092F \u0924\u093F\u0925\u093F \u0924\u0915 \u0936\u0947\u0937 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928, \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0938\u092A\u094D\u0924\u093E\u0939, \u092A\u0942\u0930\u094D\u0923 \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0936\u0947\u0937 \u0926\u093F\u0928 \u0932\u094C\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Puedes elegir si quieres incluir el día de hoy dentro del conteo.",
                        en: "You can choose whether today should count as part of the period.",
                        hi: "\u0906\u092A \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u0906\u091C \u0915\u094B \u0905\u0935\u0927\u093F \u0915\u0947 \u092D\u093E\u0917 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0917\u093F\u0928\u093E \u091C\u093E\u0928\u093E \u091A\u093E\u0939\u093F\u090F \u092F\u093E \u0928\u0939\u0940\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Usos comunes", en: "Common uses", hi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0909\u092A\u092F\u094B\u0917" },
                body: [
                    {
                        es: "Sirve para saber cuántos días faltan para una fecha, un viaje, un cumpleaños, una entrega, un examen o un evento importante.",
                        en: "It helps you know how many days are left until a date, trip, birthday, delivery, exam, or important event, similar to a days till calculator.",
                        hi: "\u092F\u0939 \u0906\u092A\u0915\u094B \u092F\u0939 \u091C\u093E\u0928\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948 \u0915\u093F \u0915\u093F\u0938\u0940 \u0924\u093E\u0930\u0940\u0916, \u092F\u093E\u0924\u094D\u0930\u093E, \u091C\u0928\u094D\u092E\u0926\u093F\u0928, \u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u092F\u093E \u092E\u0939\u0924\u094D\u0935\u092A\u0942\u0930\u094D\u0923 \u0918\u091F\u0928\u093E \u092E\u0947\u0902 \u0915\u093F\u0924\u0928\u0947 \u0926\u093F\u0928 \u092C\u091A\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "No interpreta días hábiles, festivos, vencimientos legales ni reglas de entidades.",
                        en: "It does not interpret business days, holidays, legal deadlines, or institution-specific rules.",
                        hi: "\u092F\u0939 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902, \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u092E\u092F-\u0938\u0940\u092E\u093E \u092F\u093E \u0938\u0902\u0938\u094D\u0925\u093E\u0928-\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo saber cuántos días faltan para una fecha?", en: "How do I know how many days are left until a date?", hi: "\u092E\u0941\u091D\u0947 \u0915\u0948\u0938\u0947 \u092A\u0924\u093E \u091A\u0932\u0947\u0917\u093E \u0915\u093F \u0915\u093F\u0938\u0940 \u0924\u093E\u0930\u0940\u0916 \u092E\u0947\u0902 \u0915\u093F\u0924\u0928\u0947 \u0926\u093F\u0928 \u092C\u091A\u0947 \u0939\u0948\u0902?" },
                answer: {
                    es: "Selecciona la fecha objetivo y la herramienta cuenta los días calendario desde hoy hasta esa fecha, además de semanas completas y días restantes.",
                    en: "Select the target date and the tool counts calendar days from today until that date, plus full weeks and remaining days.",
                    hi: "\u0932\u0915\u094D\u0937\u094D\u092F \u0924\u093F\u0925\u093F \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902 \u0914\u0930 \u091F\u0942\u0932 \u0906\u091C \u0938\u0947 \u0909\u0938 \u0924\u093F\u0925\u093F \u0924\u0915 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Cuenta días hábiles?", en: "Does it count business days?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Cuenta días calendario. Si necesitas días hábiles, festivos o reglas legales, revisa la norma correspondiente.",
                    en: "No. It counts calendar days. If you need business days, holidays, or legal rules, check the relevant rule.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092F\u0926\u093F \u0906\u092A\u0915\u094B \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0926\u093F\u0928\u094B\u0902, \u091B\u0941\u091F\u094D\u091F\u093F\u092F\u094B\u0902 \u092F\u093E \u0915\u093E\u0928\u0942\u0928\u0940 \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948, \u0924\u094B \u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u0928\u093F\u092F\u092E \u0915\u0940 \u091C\u093E\u0901\u091A \u0915\u0930\u0947\u0902\u0964"
                }
            }
        ]
    },
    "exact-age": {
        intro: {
            es: "Calcula una edad exacta en años, meses y días a partir de una fecha de nacimiento.",
            en: "Calculate an exact age in years, months, and days from a birth date.",
            hi: "\u091C\u0928\u094D\u092E\u0924\u093F\u0925\u093F \u0938\u0947 \u0935\u0930\u094D\u0937\u094B\u0902, \u092E\u0939\u0940\u0928\u094B\u0902 \u0914\u0930 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u0938\u091F\u0940\u0915 \u0906\u092F\u0941 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Muestra edad exacta, meses totales, días totales y cuánto falta para el próximo cumpleaños.",
                        en: "It shows exact age, total months, total days, and how long until the next birthday.",
                        hi: "\u092F\u0939 \u0938\u091F\u0940\u0915 \u0909\u092E\u094D\u0930, \u0915\u0941\u0932 \u092E\u0939\u0940\u0928\u0947, \u0915\u0941\u0932 \u0926\u093F\u0928 \u0914\u0930 \u0905\u0917\u0932\u0947 \u091C\u0928\u094D\u092E\u0926\u093F\u0928 \u0924\u0915 \u0915\u093F\u0924\u0928\u093E \u0938\u092E\u092F \u0936\u0947\u0937 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Puedes cambiar la fecha de cálculo si necesitas saber la edad en una fecha específica, no solo al día de hoy.",
                        en: "You can change the calculation date if you need the age on a specific date, not only today.",
                        hi: "\u092F\u0926\u093F \u0906\u092A\u0915\u094B \u0915\u0947\u0935\u0932 \u0906\u091C \u0939\u0940 \u0928\u0939\u0940\u0902, \u092C\u0932\u094D\u0915\u093F \u0915\u093F\u0938\u0940 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0924\u093F\u0925\u093F \u092A\u0930 \u0906\u092F\u0941 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948, \u0924\u094B \u0906\u092A \u0917\u0923\u0928\u093E \u0924\u093F\u0925\u093F \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo sirve", en: "When it helps", hi: "\u091C\u092C \u092F\u0939 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Es útil para formularios, trámites, requisitos de edad, documentos, colegios, viajes o simple curiosidad.",
                        en: "It is useful for forms, paperwork, age requirements, documents, school, travel, or simple curiosity.",
                        hi: "\u092F\u0939 \u092B\u0949\u0930\u094D\u092E, \u0915\u093E\u0917\u091C\u0940 \u0915\u093E\u0930\u094D\u0930\u0935\u093E\u0908, \u0906\u092F\u0941 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E\u0913\u0902, \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C, \u0938\u094D\u0915\u0942\u0932, \u092F\u093E\u0924\u094D\u0930\u093E, \u092F\u093E \u0938\u093E\u0927\u093E\u0930\u0923 \u091C\u093F\u091C\u094D\u091E\u093E\u0938\u093E \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    },
                    {
                        es: "El resultado es calendario y puede variar frente a reglas administrativas específicas.",
                        en: "The result is calendar-based and may differ from specific administrative rules.",
                        hi: "\u092A\u0930\u093F\u0923\u093E\u092E \u0915\u0948\u0932\u0947\u0902\u0921\u0930-\u0906\u0927\u093E\u0930\u093F\u0924 \u0939\u0948 \u0914\u0930 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u092A\u094D\u0930\u0936\u093E\u0938\u0928\u093F\u0915 \u0928\u093F\u092F\u092E\u094B\u0902 \u0938\u0947 \u092D\u093F\u0928\u094D\u0928 \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Puedo calcular la edad en una fecha pasada?",
                    en: "Can I calculate age on a past date?",
                    hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u092A\u093F\u091B\u0932\u0940 \u0924\u093E\u0930\u0940\u0916 \u092A\u0930 \u0909\u092E\u094D\u0930 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?"
                },
                answer: {
                    es: "Sí. Cambia la fecha de cálculo y la herramienta usará esa fecha como referencia.",
                    en: "Yes. Change the calculation date and the tool will use that date as the reference.",
                    hi: "\u0939\u093E\u0901\u0964 \u0917\u0923\u0928\u093E \u0924\u093F\u0925\u093F \u092C\u0926\u0932\u0947\u0902 \u0914\u0930 \u0909\u092A\u0915\u0930\u0923 \u0909\u0938 \u0924\u093F\u0925\u093F \u0915\u094B \u0938\u0902\u0926\u0930\u094D\u092D \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0917\u093E\u0964"
                }
            },
            {
                question: { es: "¿Incluye horas o minutos?", en: "Does it include hours or minutes?", hi: "\u0915\u094D\u092F\u093E \u0907\u0938\u092E\u0947\u0902 \u0918\u0902\u091F\u0947 \u092F\u093E \u092E\u093F\u0928\u091F \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902?" },
                answer: {
                    es: "No. El cálculo trabaja por fechas calendario.",
                    en: "No. The calculation works with calendar dates only.",
                    hi: "\u0928\u0939\u0940\u0902, \u0917\u0923\u0928\u093E \u0915\u0947\u0935\u0932 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0915\u093E\u092E \u0915\u0930\u0924\u0940 \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Qué fecha debo poner?", en: "Which date should I enter?", hi: "\u092E\u0941\u091D\u0947 \u0915\u094C\u0928 \u0938\u0940 \u0924\u093E\u0930\u0940\u0916 \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u0940 \u091A\u093E\u0939\u093F\u090F?" },
                answer: {
                    es: "Pon la fecha de nacimiento de la persona y, si necesitas una edad para otro momento, cambia la fecha de cálculo.",
                    en: "Enter the person's birth date and, if you need the age for another moment, change the calculation date.",
                    hi: "\u0935\u094D\u092F\u0915\u094D\u0924\u093F \u0915\u0940 \u091C\u0928\u094D\u092E\u0924\u093F\u0925\u093F \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 \u0914\u0930, \u092F\u0926\u093F \u0906\u092A\u0915\u094B \u0915\u093F\u0938\u0940 \u0905\u0928\u094D\u092F \u0915\u094D\u0937\u0923 \u0915\u0947 \u0932\u093F\u090F \u0906\u092F\u0941 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948, \u0924\u094B \u0917\u0923\u0928\u093E \u0924\u093F\u0925\u093F \u092C\u0926\u0932\u0947\u0902\u0964"
                }
            }
        ]
    },
    "unit-converter": {
        intro: {
            es: "Convierte unidades comunes de longitud, peso, masa y temperatura de forma rápida.",
            en: "Convert common length, mass, weight, and temperature units quickly.",
            hi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0932\u0902\u092C\u093E\u0908, \u0926\u094D\u0930\u0935\u094D\u092F\u092E\u093E\u0928, \u0935\u091C\u0928 \u0914\u0930 \u0924\u093E\u092A\u092E\u093E\u0928 \u0907\u0915\u093E\u0907\u092F\u094B\u0902 \u0915\u094B \u0936\u0940\u0918\u094D\u0930\u0924\u093E \u0938\u0947 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Cómo funciona", en: "How it works", hi: "\u092F\u0939 \u0915\u0948\u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Elige el tipo de conversión, escribe el valor, selecciona la unidad de origen y la unidad destino.",
                        en: "Choose the conversion type, enter the value, and select the source and destination units.",
                        hi: "\u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u092A\u094D\u0930\u0915\u093E\u0930 \u091A\u0941\u0928\u0947\u0902, \u092E\u093E\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902, \u0914\u0930 \u0938\u094D\u0930\u094B\u0924 \u0914\u0930 \u0917\u0902\u0924\u0935\u094D\u092F \u0907\u0915\u093E\u0907\u092F\u094B\u0902 \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Puedes ajustar los decimales para ver un resultado más redondeado o más preciso.",
                        en: "You can adjust the decimals to get a more rounded or more precise result.",
                        hi: "\u0905\u0927\u093F\u0915 \u0917\u094B\u0932\u093E\u0915\u093E\u0930 \u092F\u093E \u0905\u0927\u093F\u0915 \u0938\u091F\u0940\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u092A \u0926\u0936\u092E\u0932\u0935 \u0915\u094B \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarlo", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Sirve para tareas, compras, medidas de cocina, viajes, trabajo técnico o conversiones rápidas como kilos a libras, kilómetros a millas o grados Celsius a Fahrenheit.",
                        en: "Use it for homework, shopping, cooking measurements, trips, technical work, or quick conversions such as kilograms to pounds, kilometers to miles, or Celsius to Fahrenheit.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0939\u094B\u092E\u0935\u0930\u094D\u0915, \u0916\u0930\u0940\u0926\u093E\u0930\u0940, \u0916\u093E\u0928\u093E \u092A\u0915\u093E\u0928\u0947 \u0915\u0947 \u092E\u093E\u092A, \u092F\u093E\u0924\u094D\u0930\u093E\u090F\u0902, \u0924\u0915\u0928\u0940\u0915\u0940 \u0915\u093E\u0930\u094D\u092F \u092F\u093E \u0915\u093F\u0932\u094B\u0917\u094D\u0930\u093E\u092E \u0938\u0947 \u092A\u093E\u0909\u0902\u0921, \u0915\u093F\u0932\u094B\u092E\u0940\u091F\u0930 \u0938\u0947 \u092E\u0940\u0932, \u092F\u093E \u0938\u0947\u0932\u094D\u0938\u093F\u092F\u0938 \u0938\u0947 \u092B\u093C\u093E\u0930\u0947\u0928\u0939\u093E\u0907\u091F \u091C\u0948\u0938\u0947 \u0924\u094D\u0935\u0930\u093F\u0924 \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Usa factores estándar; algunas industrias pueden usar factores o tolerancias específicas.",
                        en: "It uses standard factors; some industries may use their own factors or tolerances.",
                        hi: "\u092F\u0939 \u092E\u093E\u0928\u0915 \u0915\u093E\u0930\u0915\u094B\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948; \u0915\u0941\u091B \u0909\u0926\u094D\u092F\u094B\u0917 \u0905\u092A\u0928\u0947 \u0938\u094D\u0935\u092F\u0902 \u0915\u0947 \u0915\u093E\u0930\u0915\u094B\u0902 \u092F\u093E \u0938\u0939\u0928\u0936\u0940\u0932\u0924\u093E \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Puedo intercambiar las unidades?", en: "Can I swap the units?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0907\u0915\u093E\u0907\u092F\u094B\u0902 \u0915\u0940 \u0905\u0926\u0932\u093E-\u092C\u0926\u0932\u0940 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Usa el botón de intercambio para cambiar origen y destino rápidamente.",
                    en: "Yes. Use the swap button to change source and destination quickly.",
                    hi: "\u0939\u093E\u0901\u0964 \u0938\u094D\u0930\u094B\u0924 \u0914\u0930 \u0917\u0902\u0924\u0935\u094D\u092F \u0915\u094B \u0936\u0940\u0918\u094D\u0930\u0924\u093E \u0938\u0947 \u092C\u0926\u0932\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0935\u0948\u092A \u092C\u091F\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "¿El resultado es exacto?", en: "Is the result exact?", hi: "\u0915\u094D\u092F\u093E \u092A\u0930\u093F\u0923\u093E\u092E \u0938\u091F\u0940\u0915 \u0939\u0948?" },
                answer: {
                    es: "Para factores estándar sí es una conversión matemática. Puede variar si una industria usa reglas propias.",
                    en: "For standard factors, yes, it is a mathematical conversion. It may vary if an industry uses its own rules.",
                    hi: "\u092E\u093E\u0928\u0915 \u0915\u093E\u0930\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F, \u0939\u093E\u0901, \u092F\u0939 \u090F\u0915 \u0917\u0923\u093F\u0924\u0940\u092F \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u0939\u0948\u0964 \u092F\u0926\u093F \u0915\u094B\u0908 \u0909\u0926\u094D\u092F\u094B\u0917 \u0905\u092A\u0928\u0947 \u0938\u094D\u0935\u092F\u0902 \u0915\u0947 \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0924\u094B \u092F\u0939 \u092D\u093F\u0928\u094D\u0928 \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Qué unidades puedo convertir?", en: "Which units can I convert?", hi: "\u092E\u0948\u0902 \u0915\u093F\u0928 \u0907\u0915\u093E\u0907\u092F\u094B\u0902 \u0915\u094B \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Puedes convertir unidades comunes de longitud, peso, masa y temperatura, con decimales ajustables según la precisión que necesites.",
                    en: "You can convert common length, mass, weight, and temperature units, with adjustable decimals depending on the precision you need.",
                    hi: "\u0906\u092A \u0905\u092A\u0928\u0940 \u0906\u0935\u0936\u094D\u092F\u0915 \u0938\u091F\u0940\u0915\u0924\u093E \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u0938\u092E\u093E\u092F\u094B\u091C\u094D\u092F \u0926\u0936\u092E\u0932\u0935 \u0915\u0947 \u0938\u093E\u0925 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0932\u0902\u092C\u093E\u0908, \u0926\u094D\u0930\u0935\u094D\u092F\u092E\u093E\u0928, \u0935\u091C\u0928 \u0914\u0930 \u0924\u093E\u092A\u092E\u093E\u0928 \u0907\u0915\u093E\u0907\u092F\u094B\u0902 \u0915\u094B \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            }
        ]
    },
    "text-case-converter": {
        intro: {
            es: "Convierte texto a mayúsculas, minúsculas, capitalizado o tipo oración sin enviarlo a ningún servidor.",
            en: "Convert text from lower case to upper case, uppercase to lowercase, title case, or sentence case without sending it to any server.",
            hi: "\u0915\u093F\u0938\u0940 \u092D\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0905\u092A\u0930\u0915\u0947\u0938, \u0932\u094B\u0905\u0930\u0915\u0947\u0938, \u091F\u093E\u0907\u091F\u0932 \u0915\u0947\u0938 \u092F\u093E \u0935\u093E\u0915\u094D\u092F \u0915\u0947\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Formatos disponibles", en: "Available formats", hi: "\u0909\u092A\u0932\u092C\u094D\u0927 \u092A\u094D\u0930\u093E\u0930\u0942\u092A" },
                body: [
                    {
                        es: "Puedes convertir texto a mayúsculas, pasar mayúscula a minúscula, cambiar minúsculas a mayúsculas, capitalizar palabras o ajustar frases tipo oración.",
                        en: "You can convert text to uppercase, change uppercase to lowercase, switch lowercase to uppercase, title case words, or use it as a capital letter converter.",
                        hi: "\u0906\u092A \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0905\u092A\u0930\u0915\u0947\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0905\u092A\u0930\u0915\u0947\u0938 \u0915\u094B \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u094B \u0905\u092A\u0930\u0915\u0947\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0936\u0940\u0930\u094D\u0937\u0915 \u0915\u0947\u0938 \u0936\u092C\u094D\u0926, \u092F\u093E \u0935\u093E\u0915\u094D\u092F\u094B\u0902 \u0915\u094B \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Es útil para títulos, documentos, formularios, correos, publicaciones, limpiar texto copiado y tareas repetitivas de edición.",
                        en: "It is useful for titles, documents, forms, emails, posts, copied text cleanup, and repetitive editing tasks.",
                        hi: "\u092F\u0939 \u0936\u0940\u0930\u094D\u0937\u0915\u094B\u0902, \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u094B\u0902, \u092A\u094D\u0930\u092A\u0924\u094D\u0930\u094B\u0902, \u0908\u092E\u0947\u0932, \u092A\u094B\u0938\u094D\u091F \u0914\u0930 \u0926\u094B\u0939\u0930\u093E\u090F \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u0938\u0902\u092A\u093E\u0926\u0928 \u0915\u093E\u0930\u094D\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Privacidad", en: "Privacy", hi: "\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E" },
                body: [
                    {
                        es: "La transformación ocurre en tu navegador. El texto no se envía a la API.",
                        en: "The transformation happens in your browser. The text is not sent to the API.",
                        hi: "\u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u093E \u0939\u0948. \u092A\u093E\u0920 \u090F\u092A\u0940\u0906\u0908 \u0915\u094B \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948."
                    },
                    {
                        es: "Aun así, evita pegar información sensible si no es necesario.",
                        en: "Even so, avoid pasting sensitive information unless you truly need to.",
                        hi: "\u092B\u093F\u0930 \u092D\u0940, \u0938\u0902\u0935\u0947\u0926\u0928\u0936\u0940\u0932 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u091A\u093F\u092A\u0915\u093E\u0928\u0947 \u0938\u0947 \u092C\u091A\u0947\u0902 \u091C\u092C \u0924\u0915 \u0915\u093F \u0906\u092A\u0915\u094B \u0935\u093E\u0938\u094D\u0924\u0935 \u092E\u0947\u0902 \u0907\u0938\u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0928 \u0939\u094B\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usar cada formato", en: "When to use each format", hi: "\u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Mayúsculas sirve para textos que deben resaltar. Minúsculas ayuda cuando recibes un texto desordenado o escrito completo en letras grandes.",
                        en: "Uppercase helps text stand out. Lowercase helps when you receive messy text or text written fully in capital letters.",
                        hi: "\u0905\u092A\u0930\u0915\u0947\u0938 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0905\u0932\u0917 \u0926\u093F\u0916\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u091C\u092C \u0906\u092A\u0915\u094B \u0917\u0928\u094D\u0926\u093E \u092A\u093E\u0920 \u092F\u093E \u092A\u0942\u0930\u094D\u0923\u0924\u0903 \u092C\u0921\u093C\u0947 \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u092E\u0947\u0902 \u0932\u093F\u0916\u093E \u0939\u0941\u0906 \u092A\u093E\u0920 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0924\u093E \u0939\u0948 \u0924\u094B \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Capitalizado funciona para nombres y títulos cortos. Tipo oración funciona mejor para párrafos o frases normales.",
                        en: "Title case works for names and short headings. Sentence case works better for normal phrases or paragraphs.",
                        hi: "\u0936\u0940\u0930\u094D\u0937\u0915 \u0915\u0947\u0938 \u0928\u093E\u092E\u094B\u0902 \u0914\u0930 \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u0936\u0940\u0930\u094D\u0937\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0935\u093E\u0915\u094D\u092F \u0915\u093E \u092E\u093E\u092E\u0932\u093E \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0935\u093E\u0915\u094D\u092F\u093E\u0902\u0936\u094B\u0902 \u092F\u093E \u0905\u0928\u0941\u091A\u094D\u091B\u0947\u0926\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092C\u0947\u0939\u0924\u0930 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo convertir texto a mayúsculas?", en: "How do I convert text to uppercase?", hi: "\u092E\u0948\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0905\u092A\u0930\u0915\u0947\u0938 \u092E\u0947\u0902 \u0915\u0948\u0938\u0947 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0942\u0902?" },
                answer: {
                    es: "Pega tu texto, elige la opción de mayúsculas y pulsa convertir. La herramienta transforma todo el contenido en el navegador.",
                    en: "Paste your text, choose uppercase, and press convert. The tool transforms the content in your browser.",
                    hi: "\u0905\u092A\u0928\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902, \u0905\u092A\u0930\u0915\u0947\u0938 \u091A\u0941\u0928\u0947\u0902 \u0914\u0930 \u0915\u0928\u094D\u0935\u0930\u094D\u091F \u0926\u092C\u093E\u090F\u0901\u0964 \u092F\u0939 \u091F\u0942\u0932 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u094B \u092C\u0926\u0932 \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El texto se guarda?", en: "Is the text stored?", hi: "\u0915\u094D\u092F\u093E \u092A\u093E\u0920 \u0938\u0902\u0917\u094D\u0930\u0939\u0940\u0924 \u0939\u0948?" },
                answer: {
                    es: "No. La herramienta lo procesa localmente en el navegador.",
                    en: "No. The tool processes it locally in the browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u091F\u0942\u0932 \u0907\u0938\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0938\u0902\u0938\u093E\u0927\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Tipo oración agrega puntos?", en: "Does sentence case add periods?", hi: "\u0915\u094D\u092F\u093E \u0935\u093E\u0915\u094D\u092F \u0915\u093E \u092E\u093E\u092E\u0932\u093E \u0905\u0935\u0927\u093F \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "Sí, cuando una frase termina en letra o número y no tiene signo final, agrega punto para cerrar la oración.",
                    en: "Yes. When a sentence ends in a letter or number and lacks ending punctuation, it adds a period.",
                    hi: "\u0939\u093E\u0901\u0964 \u091C\u092C \u0915\u094B\u0908 \u0935\u093E\u0915\u094D\u092F \u0915\u093F\u0938\u0940 \u0905\u0915\u094D\u0937\u0930 \u092F\u093E \u0938\u0902\u0916\u094D\u092F\u093E \u092E\u0947\u0902 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B\u0924\u093E \u0939\u0948 \u0914\u0930 \u0905\u0902\u0924 \u092E\u0947\u0902 \u0935\u093F\u0930\u093E\u092E \u091A\u093F\u0939\u094D\u0928 \u0928\u0939\u0940\u0902 \u0939\u094B\u0924\u093E \u0939\u0948, \u0924\u094B \u092F\u0939 \u090F\u0915 \u0905\u0935\u0927\u093F \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo convertir mayúsculas a minúsculas?", en: "Can I convert uppercase to lowercase?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0905\u092A\u0930\u0915\u0947\u0938 \u0915\u094B \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Elige minúsculas, pega tu texto y pulsa convertir para transformar todo el contenido.",
                    en: "Yes. Choose lowercase, paste your text, and press convert to transform all content.",
                    hi: "\u0939\u093E\u0901\u0964 \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u091A\u0941\u0928\u0947\u0902, \u0905\u092A\u0928\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902, \u0914\u0930 \u0938\u092D\u0940 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u094B \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0928\u094D\u0935\u0930\u094D\u091F \u0926\u092C\u093E\u090F\u0901\u0964"
                }
            }
        ]
    },
    "duplicate-counter": {
        intro: {
            es: "Cuenta duplicados online en una lista, columna o bloque de texto y genera una vista con valores únicos, repetidos y ocurrencias.",
            en: "Count duplicates online in a list, column, or text block and generate a view with unique values, duplicate lines, and occurrences.",
            hi: "\u0915\u093F\u0938\u0940 \u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0914\u0930 \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092E\u093E\u0928\u094B\u0902 \u0914\u0930 \u0909\u0928\u0915\u0940 \u0918\u091F\u0928\u093E\u0913\u0902 \u0915\u0947 \u0938\u093E\u0925 \u090F\u0915 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0926\u0943\u0936\u094D\u092F \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Toma cada línea como un valor y muestra cuántas líneas hay, cuántos valores únicos existen y qué valores aparecen más de una vez.",
                        en: "It treats each line as one value and shows total lines, how many unique values exist, and which values appear more than once.",
                        hi: "\u092F\u0939 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0902\u0915\u094D\u0924\u093F \u0915\u094B \u090F\u0915 \u092E\u093E\u0928 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u092E\u093E\u0928\u0924\u093E \u0939\u0948 \u0914\u0930 \u0915\u0941\u0932 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u094B \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948, \u0915\u093F\u0924\u0928\u0947 \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092E\u093E\u0928 \u092E\u094C\u091C\u0942\u0926 \u0939\u0948\u0902, \u0914\u0930 \u0915\u094C\u0928 \u0938\u0947 \u092E\u093E\u0928 \u090F\u0915 \u0938\u0947 \u0905\u0927\u093F\u0915 \u092C\u093E\u0930 \u0926\u093F\u0916\u093E\u0908 \u0926\u0947\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "También entrega una lista de resultados, una tabla con conteos y opciones para copiar o descargar el resultado en CSV.",
                        en: "It also returns a distinct list, a count table, and options to copy or download the result as CSV.",
                        hi: "\u092F\u0939 \u090F\u0915 \u0905\u0932\u0917 \u0938\u0942\u091A\u0940, \u090F\u0915 \u0917\u093F\u0928\u0924\u0940 \u0924\u093E\u0932\u093F\u0915\u093E \u0914\u0930 \u092A\u0930\u093F\u0923\u093E\u092E \u0915\u094B \u0938\u0940\u090F\u0938\u0935\u0940 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0915\u0949\u092A\u0940 \u092F\u093E \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0928\u0947 \u0915\u093E \u0935\u093F\u0915\u0932\u094D\u092A \u092D\u0940 \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarlo", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Sirve para revisar correos, códigos, IDs, URLs, nombres, SKUs o columnas copiadas desde Excel cuando necesitas detectar repetidos rápido.",
                        en: "Use this duplicate counter to review emails, codes, IDs, URLs, names, SKUs, or columns copied from Excel when you need to detect repeated values quickly.",
                        hi: "\u091C\u092C \u0906\u092A\u0915\u094B \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u092E\u093E\u0928\u094B\u0902 \u0915\u093E \u0924\u0941\u0930\u0902\u0924 \u092A\u0924\u093E \u0932\u0917\u093E\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B \u0924\u094B \u090F\u0915\u094D\u0938\u0947\u0932 \u0938\u0947 \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u0908\u092E\u0947\u0932, \u0915\u094B\u0921, \u0906\u0908\u0921\u0940, \u092F\u0942\u0906\u0930\u090F\u0932, \u0928\u093E\u092E, \u090F\u0938\u0915\u0947\u092F\u0942 \u092F\u093E \u0915\u0949\u0932\u092E \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Puedes ignorar mayúsculas, limpiar espacios al inicio y final, omitir líneas vacías y filtrar solo duplicados o solo únicos.",
                        en: "You can ignore case, trim leading and trailing spaces, skip empty lines, and filter only duplicates or only unique values.",
                        hi: "\u0906\u092A \u092E\u093E\u092E\u0932\u0947 \u0915\u094B \u0905\u0928\u0926\u0947\u0916\u093E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0905\u0917\u094D\u0930\u0923\u0940 \u0914\u0930 \u0905\u0928\u0941\u0917\u093E\u092E\u0940 \u0938\u094D\u0925\u093E\u0928\u094B\u0902 \u0915\u094B \u091F\u094D\u0930\u093F\u092E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0916\u093E\u0932\u0940 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u094B \u091B\u094B\u0921\u093C \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0915\u0947\u0935\u0932 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u092F\u093E \u0915\u0947\u0935\u0932 \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092E\u093E\u0928\u094B\u0902 \u0915\u094B \u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo contar duplicados en una lista?", en: "How do I count duplicates online in a list?", hi: "\u092E\u0948\u0902 \u0915\u093F\u0938\u0940 \u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Pega una lista con un valor por línea y pulsa contar duplicados. La herramienta muestra cuántas veces aparece cada valor y separa valores únicos, repetidos y duplicados.",
                    en: "Paste a list with one value per line and press count duplicates. The tool shows how many times each value appears and separates unique, repeated, and duplicate values.",
                    hi: "\u092A\u094D\u0930\u0924\u093F \u092A\u0902\u0915\u094D\u0924\u093F \u090F\u0915 \u092E\u093E\u0928 \u0915\u0947 \u0938\u093E\u0925 \u090F\u0915 \u0938\u0942\u091A\u0940 \u091A\u093F\u092A\u0915\u093E\u090F\u0901 \u0914\u0930 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0926\u092C\u093E\u090F\u0901\u0964 \u0909\u092A\u0915\u0930\u0923 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948 \u0915\u093F \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092E\u093E\u0928 \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u092A\u094D\u0930\u0915\u091F \u0939\u094B\u0924\u093E \u0939\u0948 \u0914\u0930 \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092E\u093E\u0928\u094B\u0902 \u0915\u094B \u0905\u0932\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Qué significa lista de resultados?", en: "What does distinct list mean?", hi: "\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0938\u0942\u091A\u0940 \u0915\u093E \u0915\u094D\u092F\u093E \u0905\u0930\u094D\u0925 \u0939\u0948?" },
                answer: {
                    es: "Una lista de resultados contiene cada valor una sola vez. Si un valor aparece varias veces en la entrada, en esa lista solo se muestra una vez.",
                    en: "A distinct list contains each value only once. If a value appears several times in the input, the distinct list shows it only once.",
                    hi: "\u090F\u0915 \u0905\u0932\u0917 \u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092E\u093E\u0928 \u0915\u0947\u0935\u0932 \u090F\u0915 \u092C\u093E\u0930 \u0939\u094B\u0924\u093E \u0939\u0948\u0964 \u092F\u0926\u093F \u0915\u094B\u0908 \u092E\u093E\u0928 \u0907\u0928\u092A\u0941\u091F \u092E\u0947\u0902 \u0915\u0908 \u092C\u093E\u0930 \u0926\u093F\u0916\u093E\u0908 \u0926\u0947\u0924\u093E \u0939\u0948, \u0924\u094B \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0938\u0942\u091A\u0940 \u0907\u0938\u0947 \u0915\u0947\u0935\u0932 \u090F\u0915 \u092C\u093E\u0930 \u0926\u093F\u0916\u093E\u0924\u0940 \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo contar duplicados ignorando mayúsculas?", en: "Can I count duplicates ignoring uppercase and lowercase?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0905\u092A\u0930\u0915\u0947\u0938 \u0914\u0930 \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u094B \u0905\u0928\u0926\u0947\u0916\u093E \u0915\u0930\u0915\u0947 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0902?" },
                answer: {
                    es: "Sí. Activa la opción de ignorar mayúsculas/minúsculas para que valores como Hola, hola y HOLA cuenten como el mismo elemento.",
                    en: "Yes. Turn on ignore uppercase/lowercase so values like Hello, hello, and HELLO count as the same item.",
                    hi: "\u0939\u093E\u0901\u0964 \u0905\u092A\u0930\u0915\u0947\u0938/\u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u094B \u0905\u0928\u0926\u0947\u0916\u093E \u0915\u0930\u0947\u0902 \u091A\u093E\u0932\u0942 \u0915\u0930\u0947\u0902 \u0924\u093E\u0915\u093F \u0939\u0948\u0932\u094B, \u0939\u0948\u0932\u094B \u0914\u0930 \u0939\u0947\u0932\u094B \u091C\u0948\u0938\u0947 \u092E\u093E\u0928 \u090F\u0915 \u0939\u0940 \u0906\u0907\u091F\u092E \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0917\u093F\u0928\u0947 \u091C\u093E\u090F\u0902\u0964"
                }
            },
            {
                question: { es: "¿El texto se envía a un servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. El conteo ocurre en tu navegador.",
                    en: "No. The counting happens in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0917\u093F\u0928\u0924\u0940 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                }
            }
        ]
    },
    "remove-extra-spaces": {
        intro: {
            es: "Limpia espacios extra, tabs y líneas vacías de textos o listas directamente en tu navegador.",
            en: "Clean extra spaces, tabs, and blank lines from text or lists directly in your browser.",
            hi: "\u0938\u0940\u0927\u0947 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092F\u093E \u0938\u0942\u091A\u093F\u092F\u094B\u0902 \u0938\u0947 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928, \u091F\u0948\u092C \u0914\u0930 \u0930\u093F\u0915\u094D\u0924 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué limpia", en: "What it cleans", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0938\u093E\u092B\u093C \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Puedes eliminar espacios al inicio y final de cada línea, reducir espacios repetidos, convertir tabs en espacios y eliminar líneas vacías.",
                        en: "You can trim leading and trailing spaces on each line, reduce repeated spaces, convert tabs to spaces, and remove empty lines.",
                        hi: "\u0906\u092A \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0902\u0915\u094D\u0924\u093F \u092E\u0947\u0902 \u0906\u0917\u0947 \u0914\u0930 \u092A\u0940\u091B\u0947 \u0915\u0947 \u0938\u094D\u0925\u093E\u0928\u094B\u0902 \u0915\u094B \u091F\u094D\u0930\u093F\u092E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u0938\u094D\u0925\u093E\u0928\u094B\u0902 \u0915\u094B \u0915\u092E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u091F\u0948\u092C \u0915\u094B \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928\u094B\u0902 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0916\u093E\u0932\u0940 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u094B \u0939\u091F\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Sirve para columnas copiadas desde Excel, listas pegadas desde sistemas, documentos, correos o textos que llegan con formato irregular.",
                        en: "Use it for columns copied from Excel, lists pasted from systems, documents, emails, or text with irregular formatting.",
                        hi: "\u090F\u0915\u094D\u0938\u0947\u0932 \u0938\u0947 \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u0915\u0949\u0932\u092E, \u0938\u093F\u0938\u094D\u091F\u092E \u0938\u0947 \u091A\u093F\u092A\u0915\u093E\u0908 \u0917\u0908 \u0938\u0942\u091A\u093F\u092F\u094B\u0902, \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u094B\u0902, \u0908\u092E\u0947\u0932 \u092F\u093E \u0905\u0928\u093F\u092F\u092E\u093F\u0924 \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u093F\u0902\u0917 \u0935\u093E\u0932\u0947 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Control del resultado", en: "Result control", hi: "\u092A\u0930\u093F\u0923\u093E\u092E \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923" },
                body: [
                    {
                        es: "El resultado no cambia mientras ajustas opciones. Vuelve a pulsar limpiar espacios para generar una nueva versión.",
                        en: "The result does not change while you adjust options. Press clean spaces again to generate a new version.",
                        hi: "\u091C\u092C \u0906\u092A \u0935\u093F\u0915\u0932\u094D\u092A \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902 \u0924\u094B \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092C\u0926\u0932\u0924\u093E \u0939\u0948\u0964 \u0928\u092F\u093E \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092B\u093F\u0930 \u0938\u0947 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0926\u092C\u093E\u090F\u0901\u0964"
                    },
                    {
                        es: "También puedes copiar el texto limpio o descargarlo como archivo TXT.",
                        en: "You can also copy the clean text or download it as a TXT file.",
                        hi: "\u0906\u092A \u0938\u093E\u092B\u093C \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0915\u0949\u092A\u0940 \u092D\u0940 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u092F\u093E \u0909\u0938\u0947 TXT \u092B\u093C\u093E\u0907\u0932 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo eliminar espacios extra de un texto?", en: "How do I remove extra spaces from text?", hi: "\u092E\u0948\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0938\u0947 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0915\u0948\u0938\u0947 \u0939\u091F\u093E\u090A\u0902?" },
                answer: {
                    es: "Pega el texto, elige las opciones de limpieza y pulsa limpiar espacios. La herramienta genera una versión limpia sin enviar el contenido al servidor.",
                    en: "Paste the text, choose cleanup options, and press clean spaces. The tool generates a clean version without sending content to a server.",
                    hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091A\u093F\u092A\u0915\u093E\u090F\u0901, \u0938\u092B\u093C\u093E\u0908 \u0935\u093F\u0915\u0932\u094D\u092A \u091A\u0941\u0928\u0947\u0902 \u0914\u0930 \u0938\u093E\u092B\u093C \u0938\u094D\u0925\u093E\u0928 \u0926\u092C\u093E\u090F\u0901\u0964 \u091F\u0942\u0932 \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u090F\u0915 \u0938\u093E\u092B\u093C \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Elimina saltos de línea?", en: "Does it remove line breaks?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0932\u093E\u0907\u0928 \u092C\u094D\u0930\u0947\u0915 \u0939\u091F\u093E\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No elimina los saltos de línea normales. Solo quita líneas vacías si activas esa opción.",
                    en: "It does not remove normal line breaks. It only removes blank lines if you enable that option.",
                    hi: "\u092F\u0939 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0932\u093E\u0907\u0928 \u092C\u094D\u0930\u0947\u0915 \u0915\u094B \u0928\u0939\u0940\u0902 \u0939\u091F\u093E\u0924\u093E \u0939\u0948. \u092F\u0926\u093F \u0906\u092A \u0909\u0938 \u0935\u093F\u0915\u0932\u094D\u092A \u0915\u094B \u0938\u0915\u094D\u0937\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902 \u0924\u094B \u092F\u0939 \u0915\u0947\u0935\u0932 \u0930\u093F\u0915\u094D\u0924 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0939\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El texto se guarda?", en: "Is the text stored?", hi: "\u0915\u094D\u092F\u093E \u092A\u093E\u0920 \u0938\u0902\u0917\u094D\u0930\u0939\u0940\u0924 \u0939\u0948?" },
                answer: {
                    es: "No. La limpieza se hace localmente en el navegador.",
                    en: "No. Cleanup happens locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0915\u094D\u0932\u0940\u0928\u0905\u092A \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "remove-accents": {
        intro: {
            es: "Elimina tildes, diéresis y acentos de un texto sin enviar el contenido a ningún servidor.",
            en: "Remove accents, umlauts, and diacritics from text without sending content to any server.",
            hi: "\u0915\u093F\u0938\u0940 \u092D\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0938\u0947 \u090F\u0915\u094D\u0938\u0947\u0902\u091F, \u0909\u092E\u0932\u0949\u091F\u094D\u0938 \u0914\u0930 \u0921\u093E\u092F\u0915\u094D\u0930\u093F\u091F\u093F\u0915\u094D\u0938 \u0939\u091F\u093E\u090F\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué convierte", en: "What it converts", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Transforma letras como á, é, í, ó, ú, ü o ç en sus versiones sin acento, manteniendo mayúsculas y minúsculas.",
                        en: "It transforms letters like á, é, í, ó, ú, ü, or ç into their unaccented versions while preserving uppercase and lowercase.",
                        hi: "\u092F\u0939 \u0905\u092A\u0930\u0915\u0947\u0938 \u0914\u0930 \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u094B \u0938\u0902\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0924\u0947 \u0939\u0941\u090F \u00E1, \u00E9, \u00ED, \u00F3, \u00FA, \u00FC, \u092F\u093E \u00E7 \u091C\u0948\u0938\u0947 \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u094B \u0909\u0928\u0915\u0947 \u092C\u093F\u0928\u093E \u0909\u091A\u094D\u091A\u093E\u0930\u0923 \u0935\u093E\u0932\u0947 \u0938\u0902\u0938\u094D\u0915\u0930\u0923\u094B\u0902 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "La ñ se conserva por defecto para respetar textos en español, pero puedes convertirla en n si necesitas nombres de archivo, slugs o datos normalizados.",
                        en: "Ñ is preserved by default for Spanish text, but you can convert it to n when you need file names, slugs, or normalized data.",
                        hi: "\u00D1 \u200B\u200B\u0938\u094D\u092A\u0948\u0928\u093F\u0936 \u092A\u093E\u0920 \u0915\u0947 \u0932\u093F\u090F \u0921\u093F\u092B\u093C\u0949\u0932\u094D\u091F \u0930\u0942\u092A \u0938\u0947 \u0938\u0902\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948, \u0932\u0947\u0915\u093F\u0928 \u091C\u092C \u0906\u092A\u0915\u094B \u092B\u093C\u093E\u0907\u0932 \u0928\u093E\u092E, \u0938\u094D\u0932\u0917 \u092F\u093E \u0938\u093E\u092E\u093E\u0928\u094D\u092F\u0940\u0915\u0943\u0924 \u0921\u0947\u091F\u093E \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B \u0924\u094B \u0906\u092A \u0907\u0938\u0947 n \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarlo", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Úsalo para limpiar búsquedas, importar datos, crear rutas, comparar textos o preparar listas que no deben llevar caracteres acentuados.",
                        en: "Use it to clean searches, import data, create routes, compare text, or prepare lists that should not contain accented characters.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0916\u094B\u091C\u094B\u0902 \u0915\u094B \u0938\u093E\u092B\u093C \u0915\u0930\u0928\u0947, \u0921\u0947\u091F\u093E \u0906\u092F\u093E\u0924 \u0915\u0930\u0928\u0947, \u092E\u093E\u0930\u094D\u0917 \u092C\u0928\u093E\u0928\u0947, \u092A\u093E\u0920 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947, \u092F\u093E \u0910\u0938\u0940 \u0938\u0942\u091A\u093F\u092F\u093E\u0901 \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u0947\u0902 \u091C\u093F\u0928\u092E\u0947\u0902 \u0909\u091A\u094D\u091A\u093E\u0930\u0923 \u0935\u093E\u0932\u0947 \u0935\u0930\u094D\u0923 \u0928\u0939\u0940\u0902 \u0939\u094B\u0928\u0947 \u091A\u093E\u0939\u093F\u090F\u0964"
                    },
                    {
                        es: "El resultado queda fijo hasta que vuelves a ejecutar la herramienta, así puedes ajustar opciones sin cambiar lo ya calculado.",
                        en: "The result stays fixed until you run the tool again, so you can adjust options without changing the current output.",
                        hi: "\u091C\u092C \u0924\u0915 \u0906\u092A \u091F\u0942\u0932 \u0915\u094B \u0926\u094B\u092C\u093E\u0930\u093E \u0928\u0939\u0940\u0902 \u091A\u0932\u093E\u0924\u0947 \u0924\u092C \u0924\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0938\u094D\u0925\u093F\u0930 \u0930\u0939\u0924\u093E \u0939\u0948, \u0924\u093E\u0915\u093F \u0906\u092A \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0906\u0909\u091F\u092A\u0941\u091F \u0915\u094B \u092C\u0926\u0932\u0947 \u092C\u093F\u0928\u093E \u0935\u093F\u0915\u0932\u094D\u092A\u094B\u0902 \u0915\u094B \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930 \u0938\u0915\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo eliminar tildes de un texto?", en: "How do I remove accents from text?", hi: "\u092E\u0948\u0902 \u092A\u093E\u0920 \u0938\u0947 \u0909\u091A\u094D\u091A\u093E\u0930\u0923 \u0915\u0948\u0938\u0947 \u0939\u091F\u093E\u090A\u0902?" },
                answer: {
                    es: "Pega el texto y pulsa eliminar acentos. La herramienta devuelve una versión sin tildes ni diéresis.",
                    en: "Paste the text and press remove accents. The tool returns a version without accents or umlauts.",
                    hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091A\u093F\u092A\u0915\u093E\u090F\u0901 \u0914\u0930 \u090F\u0915\u094D\u0938\u0947\u0902\u091F \u0939\u091F\u093E\u090F\u0901 \u0926\u092C\u093E\u090F\u0901\u0964 \u091F\u0942\u0932 \u090F\u0915\u094D\u0938\u0947\u0902\u091F \u092F\u093E \u0909\u092E\u094D\u0932\u0949\u091F\u094D\u0938 \u0915\u0947 \u092C\u093F\u0928\u093E \u090F\u0915 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0932\u094C\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Qué pasa con la ñ?", en: "What happens to ñ?", hi: "\u00F1 \u0938\u0947 \u0915\u094D\u092F\u093E \u0939\u094B\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "Por defecto se conserva. Si activas convertir ñ en n, la herramienta también normaliza esa letra.",
                    en: "It is preserved by default. If you enable convert ñ to n, the tool also normalizes that letter.",
                    hi: "\u092F\u0939 \u0921\u093F\u092B\u093C\u0949\u0932\u094D\u091F \u0930\u0942\u092A \u0938\u0947 \u0938\u0902\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948. \u092F\u0926\u093F \u0906\u092A \u00F1 \u0915\u094B n \u092E\u0947\u0902 \u0915\u0928\u0935\u0930\u094D\u091F \u0915\u0930\u0928\u093E \u0938\u0915\u094D\u0937\u092E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0924\u094B \u091F\u0942\u0932 \u0909\u0938 \u0905\u0915\u094D\u0937\u0930 \u0915\u094B \u092D\u0940 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0915\u0930 \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El texto se envía al servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La conversión ocurre en tu navegador.",
                    en: "No. The conversion happens in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u093E \u0939\u0948."
                }
            }
        ]
    },
    "secure-password-generator": {
        intro: {
            es: "Genera contraseñas aleatorias y seguras directamente en tu navegador.",
            en: "Generate secure random passwords directly in your browser.",
            hi: "\u0938\u0940\u0927\u0947 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0930\u0948\u0902\u0921\u092E \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué puedes configurar", en: "What you can configure", hi: "\u0906\u092A \u0915\u094D\u092F\u093E \u0915\u0949\u0928\u094D\u092B\u093C\u093F\u0917\u0930 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902" },
                body: [
                    {
                        es: "Elige longitud, cantidad de contraseñas y tipos de caracteres: mayúsculas, minúsculas, números y símbolos.",
                        en: "Choose password length, number of passwords, and character sets: uppercase, lowercase, numbers, and symbols.",
                        hi: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u0940 \u0932\u0902\u092C\u093E\u0908, \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u0940 \u0938\u0902\u0916\u094D\u092F\u093E \u0914\u0930 \u0935\u0930\u094D\u0923 \u0938\u0947\u091F \u091A\u0941\u0928\u0947\u0902: \u0905\u092A\u0930\u0915\u0947\u0938, \u0932\u094B\u0905\u0930\u0915\u0947\u0938, \u0938\u0902\u0916\u094D\u092F\u093E\u090F\u0902 \u0914\u0930 \u092A\u094D\u0930\u0924\u0940\u0915\u0964"
                    },
                    {
                        es: "La herramienta muestra una estimación visual de seguridad para ayudarte a elegir una mejor combinación.",
                        en: "The tool shows a visual strength estimate to help you choose a better combination.",
                        hi: "\u092C\u0947\u0939\u0924\u0930 \u0938\u0902\u092F\u094B\u091C\u0928 \u091A\u0941\u0928\u0928\u0947 \u092E\u0947\u0902 \u0906\u092A\u0915\u0940 \u092E\u0926\u0926 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091F\u0942\u0932 \u090F\u0915 \u0926\u0943\u0936\u094D\u092F \u0936\u0915\u094D\u0924\u093F \u0905\u0928\u0941\u092E\u093E\u0928 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Buenas prácticas", en: "Good practices", hi: "\u0905\u091A\u094D\u091B\u0940 \u092A\u094D\u0930\u0925\u093E\u090F\u0901" },
                body: [
                    {
                        es: "Usa contraseñas largas, únicas y diferentes para cada servicio.",
                        en: "Use long, unique passwords that differ across services.",
                        hi: "\u0932\u0902\u092C\u0947, \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902 \u091C\u094B \u0938\u092D\u0940 \u0938\u0947\u0935\u093E\u0913\u0902 \u092E\u0947\u0902 \u092D\u093F\u0928\u094D\u0928 \u0939\u094B\u0902\u0964"
                    },
                    {
                        es: "Si puedes, combínalas con un gestor de contraseñas y autenticación en dos pasos.",
                        en: "If you can, combine them with a password manager and two-factor authentication.",
                        hi: "\u092F\u0926\u093F \u0906\u092A \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0924\u094B \u0909\u0928\u094D\u0939\u0947\u0902 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092E\u0948\u0928\u0947\u091C\u0930 \u0914\u0930 \u0926\u094B-\u0915\u093E\u0930\u0915 \u092A\u094D\u0930\u092E\u093E\u0923\u0940\u0915\u0930\u0923 \u0915\u0947 \u0938\u093E\u0925 \u0938\u0902\u092F\u094B\u091C\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Las contraseñas se envían al servidor?", en: "Are the passwords sent to a server?", hi: "\u0915\u094D\u092F\u093E \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u0947 \u0917\u090F \u0939\u0948\u0902?" },
                answer: {
                    es: "No. Se generan en tu navegador.",
                    en: "No. They are generated in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0935\u0947 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: { es: "¿Qué longitud conviene usar?", en: "What length should I use?", hi: "\u092E\u0941\u091D\u0947 \u0915\u093F\u0938 \u0932\u0902\u092C\u093E\u0908 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u093F\u090F?" },
                answer: {
                    es: "Para cuentas importantes, una longitud de 16 caracteres o más suele ser una mejor base.",
                    en: "For important accounts, 16 characters or more is usually a stronger baseline.",
                    hi: "\u092E\u0939\u0924\u094D\u0935\u092A\u0942\u0930\u094D\u0923 \u0916\u093E\u0924\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F, 16 \u0905\u0915\u094D\u0937\u0930 \u092F\u093E \u0905\u0927\u093F\u0915 \u0906\u092E \u0924\u094C\u0930 \u092A\u0930 \u090F\u0915 \u092E\u091C\u092C\u0942\u0924 \u0906\u0927\u093E\u0930 \u0930\u0947\u0916\u093E \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                }
            }
        ]
    },
    "random-text-generator": {
        intro: {
            es: "Genera texto aleatorio para pruebas, formularios, diseños, hojas de cálculo o contenido temporal sin usar IA ni enviar datos a un servidor.",
            en: "Generate random text for tests, forms, designs, spreadsheets, or temporary content without using AI or sending data to a server.",
            hi: "\u090F\u0906\u0908 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u093F\u090F \u092C\u093F\u0928\u093E \u092F\u093E \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0921\u0947\u091F\u093E \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u0923, \u092B\u0949\u0930\u094D\u092E, \u0921\u093F\u091C\u093C\u093E\u0907\u0928, \u0938\u094D\u092A\u094D\u0930\u0947\u0921\u0936\u0940\u091F \u092F\u093E \u0905\u0938\u094D\u0925\u093E\u092F\u0940 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u0947 \u0932\u093F\u090F \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u092A\u093E\u0920 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué puedes generar", en: "What you can generate", hi: "\u0906\u092A \u0915\u094D\u092F\u093E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902" },
                body: [
                    {
                        es: "Puedes crear palabras, frases, párrafos o listas. La herramienta permite elegir entre texto natural desde bancos locales o Lorem ipsum tradicional.",
                        en: "You can create words, sentences, paragraphs, or lists. The tool lets you choose between natural text from local banks or traditional Lorem ipsum.",
                        hi: "\u0906\u092A \u0936\u092C\u094D\u0926, \u0935\u093E\u0915\u094D\u092F, \u092A\u0948\u0930\u093E\u0917\u094D\u0930\u093E\u092B \u092F\u093E \u0938\u0942\u091A\u093F\u092F\u093E\u0901 \u092C\u0928\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 \u092F\u0939 \u091F\u0942\u0932 \u0906\u092A\u0915\u094B \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092C\u0948\u0902\u0915\u094B\u0902 \u092F\u093E \u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0932\u094B\u0930\u0947\u092E \u0907\u092A\u094D\u0938\u092E \u0938\u0947 \u092A\u094D\u0930\u093E\u0915\u0943\u0924\u093F\u0915 \u092A\u093E\u0920 \u0915\u0947 \u092C\u0940\u091A \u091A\u092F\u0928 \u0915\u0930\u0928\u0947 \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "El modo de lista sirve para generar elementos separados por línea, útil para probar tablas, formularios, columnas copiadas o campos repetidos.",
                        en: "List mode creates one item per line, useful for testing tables, forms, copied columns, or repeated fields.",
                        hi: "\u0938\u0942\u091A\u0940 \u092E\u094B\u0921 \u092A\u094D\u0930\u0924\u093F \u092A\u0902\u0915\u094D\u0924\u093F \u090F\u0915 \u0906\u0907\u091F\u092E \u092C\u0928\u093E\u0924\u093E \u0939\u0948, \u091C\u094B \u0924\u093E\u0932\u093F\u0915\u093E\u0913\u0902, \u092A\u094D\u0930\u092A\u0924\u094D\u0930\u094B\u0902, \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u0915\u0949\u0932\u092E\u094B\u0902 \u092F\u093E \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u092B\u093C\u0940\u0932\u094D\u0921 \u0915\u0947 \u092A\u0930\u0940\u0915\u094D\u0937\u0923 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo se genera", en: "How it is generated", hi: "\u092F\u0939 \u0915\u0948\u0938\u0947 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0939\u094B\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "No usa IA. Combina bancos internos de sujetos, verbos, objetos, frases y palabras para producir texto de prueba rápido y variado.",
                        en: "It does not use AI. It combines internal banks of subjects, verbs, objects, phrases, and words to produce quick and varied sample text.",
                        hi: "\u092F\u0939 AI \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948. \u092F\u0939 \u0924\u094D\u0935\u0930\u093F\u0924 \u0914\u0930 \u0935\u093F\u0935\u093F\u0927 \u0928\u092E\u0942\u0928\u093E \u092A\u093E\u0920 \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0937\u092F\u094B\u0902, \u0915\u094D\u0930\u093F\u092F\u093E\u0913\u0902, \u0935\u0938\u094D\u0924\u0941\u0913\u0902, \u0935\u093E\u0915\u094D\u092F\u093E\u0902\u0936\u094B\u0902 \u0914\u0930 \u0936\u092C\u094D\u0926\u094B\u0902 \u0915\u0947 \u0906\u0902\u0924\u0930\u093F\u0915 \u092C\u0948\u0902\u0915\u094B\u0902 \u0915\u094B \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "El resultado queda fijo hasta volver a presionar generar, así puedes cambiar opciones sin alterar el texto que ya obtuviste.",
                        en: "The result stays fixed until you press generate again, so changing options does not alter the text you already produced.",
                        hi: "\u091C\u092C \u0924\u0915 \u0906\u092A \u0926\u094B\u092C\u093E\u0930\u093E \u091C\u0928\u0930\u0947\u091F \u0928\u0939\u0940\u0902 \u0926\u092C\u093E\u0924\u0947 \u0924\u092C \u0924\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0938\u094D\u0925\u093F\u0930 \u0930\u0939\u0924\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0935\u093F\u0915\u0932\u094D\u092A \u092C\u0926\u0932\u0928\u0947 \u0938\u0947 \u0906\u092A\u0915\u0947 \u0926\u094D\u0935\u093E\u0930\u093E \u092A\u0939\u0932\u0947 \u0938\u0947 \u0909\u0924\u094D\u092A\u093E\u0926\u093F\u0924 \u092A\u093E\u0920 \u092E\u0947\u0902 \u0915\u094B\u0908 \u092C\u0926\u0932\u093E\u0935 \u0928\u0939\u0940\u0902 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo generar texto aleatorio online?", en: "How do I generate random text online?", hi: "\u092E\u0948\u0902 \u0911\u0928\u0932\u093E\u0907\u0928 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0948\u0938\u0947 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0942\u0902?" },
                answer: {
                    es: "Elige si quieres texto natural o Lorem ipsum, selecciona palabras, frases, párrafos o lista, define la cantidad y pulsa generar texto.",
                    en: "Choose natural text or Lorem ipsum, select words, sentences, paragraphs, or list, set the quantity, and press generate text.",
                    hi: "\u092A\u094D\u0930\u093E\u0915\u0943\u0924\u093F\u0915 \u092A\u093E\u0920 \u092F\u093E \u0932\u094B\u0930\u0947\u092E \u0907\u092A\u094D\u0938\u092E \u091A\u0941\u0928\u0947\u0902, \u0936\u092C\u094D\u0926\u094B\u0902, \u0935\u093E\u0915\u094D\u092F\u094B\u0902, \u0905\u0928\u0941\u091A\u094D\u091B\u0947\u0926\u094B\u0902 \u092F\u093E \u0938\u0942\u091A\u0940 \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902, \u092E\u093E\u0924\u094D\u0930\u093E \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u093F\u0924 \u0915\u0930\u0947\u0902, \u0914\u0930 \u092A\u093E\u0920 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902 \u0926\u092C\u093E\u090F\u0901\u0964"
                }
            },
            {
                question: { es: "¿El generador usa inteligencia artificial?", en: "Does the generator use artificial intelligence?", hi: "\u0915\u094D\u092F\u093E \u091C\u0928\u0930\u0947\u091F\u0930 \u0915\u0943\u0924\u094D\u0930\u093F\u092E \u092C\u0941\u0926\u094D\u0927\u093F\u092E\u0924\u094D\u0924\u093E \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Usa bancos locales de palabras y plantillas simples dentro del navegador.",
                    en: "No. It uses local word banks and simple templates inside the browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u0915\u0947 \u0905\u0902\u0926\u0930 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0935\u0930\u094D\u0921 \u092C\u0948\u0902\u0915 \u0914\u0930 \u0938\u0930\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo generar Lorem ipsum?", en: "Can I generate Lorem ipsum?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0932\u094B\u0930\u0947\u092E \u0907\u092A\u094D\u0938\u092E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Puedes cambiar la fuente a Lorem ipsum para generar texto clásico de relleno.",
                    en: "Yes. You can switch the source to Lorem ipsum to generate classic placeholder text.",
                    hi: "\u0939\u093E\u0901\u0964 \u0915\u094D\u0932\u093E\u0938\u093F\u0915 \u092A\u094D\u0932\u0947\u0938\u0939\u094B\u0932\u094D\u0921\u0930 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u092A \u0938\u094D\u0930\u094B\u0924 \u0915\u094B \u0932\u094B\u0930\u0947\u092E \u0907\u092A\u094D\u0938\u092E \u092A\u0930 \u0938\u094D\u0935\u093F\u091A \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: { es: "¿El texto se envía al servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Todo se genera localmente en tu navegador.",
                    en: "No. Everything is generated locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0938\u092C \u0915\u0941\u091B \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "alphabetical-line-sorter": {
        intro: {
            es: "Ordena líneas alfabéticamente para limpiar listas, columnas copiadas, correos, nombres, códigos o valores repetidos directamente en tu navegador.",
            en: "Sort lines alphabetically to clean lists, copied columns, emails, names, codes, or repeated values directly in your browser.",
            hi: "\u0938\u0940\u0927\u0947 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u0942\u091A\u093F\u092F\u094B\u0902, \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u0915\u0949\u0932\u092E, \u0908\u092E\u0947\u0932, \u0928\u093E\u092E, \u0915\u094B\u0921 \u092F\u093E \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u092E\u093E\u0928\u094B\u0902 \u0915\u094B \u0938\u093E\u092B\u093C \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u094B \u0935\u0930\u094D\u0923\u093E\u0928\u0941\u0915\u094D\u0930\u092E \u092E\u0947\u0902 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué ordena", en: "What it sorts", hi: "\u092F\u0939 \u0915\u093F\u0938 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Puedes pegar cualquier texto con una línea por valor y ordenarlo de A a Z o de Z a A.",
                        en: "You can paste any text with one value per line and sort it from A to Z or Z to A.",
                        hi: "\u0906\u092A \u0915\u093F\u0938\u0940 \u092D\u0940 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u092A\u094D\u0930\u0924\u093F \u092A\u0902\u0915\u094D\u0924\u093F \u090F\u0915 \u092E\u093E\u0928 \u0915\u0947 \u0938\u093E\u0925 \u092A\u0947\u0938\u094D\u091F \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0909\u0938\u0947 A \u0938\u0947 Z \u092F\u093E Z \u0938\u0947 A \u0924\u0915 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "También puedes ignorar mayúsculas/minúsculas, limpiar espacios, eliminar líneas vacías y quitar duplicados antes de generar el resultado.",
                        en: "You can also ignore uppercase/lowercase, trim spaces, remove empty lines, and remove duplicates before generating the result.",
                        hi: "\u0906\u092A \u092A\u0930\u093F\u0923\u093E\u092E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0905\u092A\u0930\u0915\u0947\u0938/\u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u094B \u0905\u0928\u0926\u0947\u0916\u093E \u092D\u0940 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u091F\u094D\u0930\u093F\u092E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0916\u093E\u0932\u0940 \u0932\u093E\u0907\u0928\u0947\u0902 \u0939\u091F\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0939\u091F\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarlo", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Sirve para ordenar nombres, listas de productos, correos, códigos, columnas de Excel, palabras clave o resultados copiados desde otra herramienta.",
                        en: "Use it to sort names, product lists, emails, codes, Excel columns, keywords, or results copied from another tool.",
                        hi: "\u0928\u093E\u092E, \u0909\u0924\u094D\u092A\u093E\u0926 \u0938\u0942\u091A\u0940, \u0908\u092E\u0947\u0932, \u0915\u094B\u0921, \u090F\u0915\u094D\u0938\u0947\u0932 \u0915\u0949\u0932\u092E, \u0915\u0940\u0935\u0930\u094D\u0921 \u092F\u093E \u0915\u093F\u0938\u0940 \u0905\u0928\u094D\u092F \u091F\u0942\u0932 \u0938\u0947 \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u092A\u0930\u093F\u0923\u093E\u092E\u094B\u0902 \u0915\u094B \u0938\u0949\u0930\u094D\u091F \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "El resultado no cambia hasta presionar ordenar de nuevo, así puedes ajustar opciones sin modificar la salida actual.",
                        en: "The result does not change until you press sort again, so you can adjust options without changing the current output.",
                        hi: "\u091C\u092C \u0924\u0915 \u0906\u092A \u0926\u094B\u092C\u093E\u0930\u093E \u0938\u0949\u0930\u094D\u091F \u0928\u0939\u0940\u0902 \u0926\u092C\u093E\u0924\u0947 \u0924\u092C \u0924\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092C\u0926\u0932\u0924\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0906\u092A \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0906\u0909\u091F\u092A\u0941\u091F \u0915\u094B \u092C\u0926\u0932\u0947 \u092C\u093F\u0928\u093E \u0935\u093F\u0915\u0932\u094D\u092A\u094B\u0902 \u0915\u094B \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo ordenar una lista alfabéticamente?", en: "How do I sort a list alphabetically?", hi: "\u092E\u0948\u0902 \u0915\u093F\u0938\u0940 \u0938\u0942\u091A\u0940 \u0915\u094B \u0935\u0930\u094D\u0923\u093E\u0928\u0941\u0915\u094D\u0930\u092E \u092E\u0947\u0902 \u0915\u0948\u0938\u0947 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Pega una lista con un valor por línea, elige A-Z o Z-A y pulsa ordenar líneas. La herramienta devuelve la lista ordenada.",
                    en: "Paste a list with one value per line, choose A-Z or Z-A, and press sort lines. The tool returns the sorted list.",
                    hi: "\u092A\u094D\u0930\u0924\u093F \u092A\u0902\u0915\u094D\u0924\u093F \u090F\u0915 \u092E\u093E\u0928 \u0915\u0947 \u0938\u093E\u0925 \u090F\u0915 \u0938\u0942\u091A\u0940 \u091A\u093F\u092A\u0915\u093E\u090F\u0901, A-Z \u092F\u093E Z-A \u091A\u0941\u0928\u0947\u0902, \u0914\u0930 \u0938\u0949\u0930\u094D\u091F \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0926\u092C\u093E\u090F\u0901\u0964 \u0909\u092A\u0915\u0930\u0923 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0938\u0942\u091A\u0940 \u0932\u094C\u091F\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo eliminar duplicados al ordenar?", en: "Can I remove duplicates while sorting?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0938\u0949\u0930\u094D\u091F \u0915\u0930\u0924\u0947 \u0938\u092E\u092F \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0939\u091F\u093E \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Activa eliminar duplicados para conservar cada línea una sola vez en el resultado.",
                    en: "Yes. Turn on remove duplicates to keep each line only once in the result.",
                    hi: "\u0939\u093E\u0901\u0964 \u092A\u0930\u093F\u0923\u093E\u092E \u092E\u0947\u0902 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0902\u0915\u094D\u0924\u093F \u0915\u094B \u0915\u0947\u0935\u0932 \u090F\u0915 \u092C\u093E\u0930 \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0939\u091F\u093E\u090F\u0901 \u091A\u093E\u0932\u0942 \u0915\u0930\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "¿El texto se envía al servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. El ordenamiento ocurre localmente en tu navegador.",
                    en: "No. Sorting happens locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0938\u0949\u0930\u094D\u091F\u093F\u0902\u0917 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                }
            }
        ]
    },
    "percentage-calculator": {
        intro: {
            es: "Calcula porcentajes comunes directamente en el navegador: porcentaje de un número, proporción entre valores, aumentos, descuentos y diferencia porcentual.",
            en: "Calculate common percentages directly in the browser: percentage of a number, value ratios, increases, discounts, and percentage change.",
            hi: "\u0938\u0940\u0927\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902: \u0915\u093F\u0938\u0940 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u093E \u092A\u094D\u0930\u0924\u093F\u0936\u0924, \u092E\u0942\u0932\u094D\u092F \u0905\u0928\u0941\u092A\u093E\u0924, \u0935\u0943\u0926\u094D\u0927\u093F, \u091B\u0942\u091F \u0914\u0930 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0964"
        },
        sections: [
            {
                title: { es: "Qué calcula", en: "What it calculates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Puedes calcular cuánto es un porcentaje de un número, qué porcentaje representa un valor frente a otro, el resultado después de un aumento o descuento y la diferencia porcentual entre dos valores.",
                        en: "You can calculate what a percentage of a number is, what percentage one value represents of another, the result after an increase or discount, and the percentage change between two values.",
                        hi: "\u0906\u092A \u0917\u0923\u0928\u093E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u0915\u093F\u0938\u0940 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u093E \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u094D\u092F\u093E \u0939\u0948, \u090F\u0915 \u092E\u093E\u0928 \u0926\u0942\u0938\u0930\u0947 \u0915\u093E \u0915\u093F\u0924\u0928\u093E \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948, \u0935\u0943\u0926\u094D\u0927\u093F \u092F\u093E \u091B\u0942\u091F \u0915\u0947 \u092C\u093E\u0926 \u092A\u0930\u093F\u0923\u093E\u092E \u0914\u0930 \u0926\u094B \u092E\u093E\u0928\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0964"
                    },
                    {
                        es: "Funciona para precios, notas, métricas, descuentos, aumentos de valor, comparaciones rápidas o cualquier cálculo porcentual básico.",
                        en: "It works for prices, grades, metrics, discounts, value increases, quick comparisons, or any basic percentage calculation.",
                        hi: "\u092F\u0939 \u0915\u0940\u092E\u0924\u094B\u0902, \u0917\u094D\u0930\u0947\u0921, \u092E\u0947\u091F\u094D\u0930\u093F\u0915\u094D\u0938, \u091B\u0942\u091F, \u092E\u0942\u0932\u094D\u092F \u0935\u0943\u0926\u094D\u0927\u093F, \u0924\u094D\u0935\u0930\u093F\u0924 \u0924\u0941\u0932\u0928\u093E \u092F\u093E \u0915\u093F\u0938\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0917\u0923\u0928\u093E \u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usarla", en: "How to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Elige el tipo de cálculo, completa los campos requeridos y pulsa calcular porcentaje. El resultado queda fijo hasta que vuelves a calcular.",
                        en: "Choose the calculation type, complete the required fields, and press calculate percentage. The result stays fixed until you calculate again.",
                        hi: "\u0917\u0923\u0928\u093E \u092A\u094D\u0930\u0915\u093E\u0930 \u091A\u0941\u0928\u0947\u0902, \u0906\u0935\u0936\u094D\u092F\u0915 \u092B\u093C\u0940\u0932\u094D\u0921 \u092A\u0942\u0930\u093E \u0915\u0930\u0947\u0902, \u0914\u0930 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0926\u092C\u093E\u090F\u0901\u0964 \u091C\u092C \u0924\u0915 \u0906\u092A \u0926\u094B\u092C\u093E\u0930\u093E \u0917\u0923\u0928\u093E \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u0947 \u0924\u092C \u0924\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0938\u094D\u0925\u093F\u0930 \u0930\u0939\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Si usas diferencia porcentual, el valor inicial no puede ser cero porque el cálculo necesita dividir entre el valor base.",
                        en: "If you use percentage change, the initial value cannot be zero because the calculation needs to divide by the base value.",
                        hi: "\u092F\u0926\u093F \u0906\u092A \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0924\u094B \u092A\u094D\u0930\u093E\u0930\u0902\u092D\u093F\u0915 \u092E\u093E\u0928 \u0936\u0942\u0928\u094D\u092F \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0917\u0923\u0928\u093E \u0915\u094B \u0906\u0927\u093E\u0930 \u092E\u093E\u0928 \u0938\u0947 \u0935\u093F\u092D\u093E\u091C\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Cómo calcular el porcentaje de un número?", en: "How do I calculate a percentage of a number?", hi: "\u092E\u0948\u0902 \u0915\u093F\u0938\u0940 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u0947 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Selecciona X% de un número, escribe el porcentaje y el número base. La herramienta multiplica el número por el porcentaje dividido entre 100.",
                    en: "Select X% of a number, enter the percentage and the base number. The tool multiplies the number by the percentage divided by 100.",
                    hi: "\u0915\u093F\u0938\u0940 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u093E X% \u091A\u0941\u0928\u0947\u0902, \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0914\u0930 \u0906\u0927\u093E\u0930 \u0938\u0902\u0916\u094D\u092F\u093E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964 \u0909\u092A\u0915\u0930\u0923 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u094B 100 \u0938\u0947 \u0935\u093F\u092D\u093E\u091C\u093F\u0924 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0938\u0947 \u0917\u0941\u0923\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Cómo calcular un descuento porcentual?", en: "How do I calculate a percentage discount?", hi: "\u092E\u0948\u0902 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u091B\u0942\u091F \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0948\u0938\u0947 \u0915\u0930\u0942\u0901?" },
                answer: {
                    es: "Selecciona aumento / descuento, elige descuento, escribe el porcentaje y el valor base. El resultado muestra el valor después de aplicar el descuento.",
                    en: "Select increase / discount, choose discount, enter the percentage and the base value. The result shows the value after applying the discount.",
                    hi: "\u0935\u0943\u0926\u094D\u0927\u093F/\u091B\u0942\u091F \u091A\u0941\u0928\u0947\u0902, \u091B\u0942\u091F \u091A\u0941\u0928\u0947\u0902, \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0914\u0930 \u0906\u0927\u093E\u0930 \u092E\u0942\u0932\u094D\u092F \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964 \u092A\u0930\u093F\u0923\u093E\u092E \u091B\u0942\u091F \u0932\u093E\u0917\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u092C\u093E\u0926 \u092E\u0942\u0932\u094D\u092F \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El cálculo se envía al servidor?", en: "Is the calculation sent to a server?", hi: "\u0915\u094D\u092F\u093E \u0917\u0923\u0928\u093E \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948?" },
                answer: {
                    es: "No. La calculadora funciona localmente en tu navegador.",
                    en: "No. The calculator works locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "json-formatter": {
        intro: {
            es: "Formatea, valida y minifica JSON directamente en el navegador para revisar respuestas de APIs, configuraciones, payloads o datos estructurados.",
            en: "Format, validate, and minify JSON directly in the browser to review API responses, configuration files, payloads, or structured data.",
            hi: "\u090F\u092A\u0940\u0906\u0908 \u092A\u094D\u0930\u0924\u093F\u0915\u094D\u0930\u093F\u092F\u093E\u0913\u0902, \u0915\u0949\u0928\u094D\u092B\u093C\u093F\u0917\u0930\u0947\u0936\u0928 \u092B\u093C\u093E\u0907\u0932\u094B\u0902, \u092A\u0947\u0932\u094B\u0921 \u092F\u093E \u0938\u0902\u0930\u091A\u093F\u0924 \u0921\u0947\u091F\u093E \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u0940\u0927\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 JSON \u0915\u094B \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930\u0947\u0902, \u092E\u093E\u0928\u094D\u092F \u0915\u0930\u0947\u0902 \u0914\u0930 \u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué hace", en: "What it does", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Convierte JSON compacto en una versión con indentación para leerlo mejor, o minifica JSON formateado para obtener una salida más pequeña.",
                        en: "It converts compact JSON into an indented version that is easier to read, or minifies formatted JSON into a smaller output.",
                        hi: "\u092F\u0939 \u0915\u0949\u092E\u094D\u092A\u0948\u0915\u094D\u091F JSON \u0915\u094B \u090F\u0915 \u0907\u0902\u0921\u0947\u0902\u091F\u0947\u0921 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948 \u091C\u093F\u0938\u0947 \u092A\u0922\u093C\u0928\u093E \u0906\u0938\u093E\u0928 \u0939\u0948, \u092F\u093E \u0938\u094D\u0935\u0930\u0942\u092A\u093F\u0924 JSON \u0915\u094B \u091B\u094B\u091F\u0947 \u0906\u0909\u091F\u092A\u0941\u091F \u092E\u0947\u0902 \u091B\u094B\u091F\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También valida la estructura y muestra un error si hay comillas mal cerradas, comas sobrantes, llaves incompletas o sintaxis inválida.",
                        en: "It also validates the structure and shows an error when quotes, commas, braces, brackets, or syntax are invalid.",
                        hi: "\u092F\u0939 \u0938\u0902\u0930\u091A\u0928\u093E \u0915\u094B \u092D\u0940 \u092E\u093E\u0928\u094D\u092F \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u0909\u0926\u094D\u0927\u0930\u0923, \u0905\u0932\u094D\u092A\u0935\u093F\u0930\u093E\u092E, \u092C\u094D\u0930\u0947\u0938\u093F\u091C\u093C, \u092C\u094D\u0930\u0948\u0915\u0947\u091F \u092F\u093E \u0935\u093E\u0915\u094D\u092F\u0935\u093F\u0928\u094D\u092F\u093E\u0938 \u0905\u092E\u093E\u0928\u094D\u092F \u0939\u094B\u0928\u0947 \u092A\u0930 \u0924\u094D\u0930\u0941\u091F\u093F \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarlo", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0928\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Úsalo para depurar respuestas de APIs, revisar objetos de configuración, limpiar datos antes de pegarlos en una herramienta técnica o preparar JSON para documentación.",
                        en: "Use it to debug API responses, inspect configuration objects, clean data before pasting it into a technical tool, or prepare JSON for documentation.",
                        hi: "\u090F\u092A\u0940\u0906\u0908 \u092A\u094D\u0930\u0924\u093F\u0915\u094D\u0930\u093F\u092F\u093E\u0913\u0902 \u0915\u094B \u0921\u0940\u092C\u0917 \u0915\u0930\u0928\u0947, \u0915\u0949\u0928\u094D\u092B\u093C\u093F\u0917\u0930\u0947\u0936\u0928 \u0911\u092C\u094D\u091C\u0947\u0915\u094D\u091F \u0915\u093E \u0928\u093F\u0930\u0940\u0915\u094D\u0937\u0923 \u0915\u0930\u0928\u0947, \u0924\u0915\u0928\u0940\u0915\u0940 \u0909\u092A\u0915\u0930\u0923 \u092E\u0947\u0902 \u091A\u093F\u092A\u0915\u093E\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0921\u0947\u091F\u093E \u0915\u094B \u0938\u093E\u092B\u093C \u0915\u0930\u0928\u0947 \u092F\u093E \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u0940\u0915\u0930\u0923 \u0915\u0947 \u0932\u093F\u090F JSON \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "El procesamiento ocurre localmente en tu navegador, así que el texto no se envía a un servidor de Tools Platforms.",
                        en: "Processing happens locally in your browser, so the text is not sent to a Tools Platforms server.",
                        hi: "\u092A\u094D\u0930\u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091F\u0942\u0932 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u093E \u091C\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Puedo validar JSON online?", en: "Can I validate JSON online?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 JSON \u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Si el JSON no es válido, la herramienta muestra un error antes de generar el resultado.",
                    en: "Yes. If the JSON is not valid, the tool shows an error before generating the result.",
                    hi: "\u0939\u093E\u0901\u0964 \u092F\u0926\u093F JSON \u092E\u093E\u0928\u094D\u092F \u0928\u0939\u0940\u0902 \u0939\u0948, \u0924\u094B \u092A\u0930\u093F\u0923\u093E\u092E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u091F\u0942\u0932 \u090F\u0915 \u0924\u094D\u0930\u0941\u091F\u093F \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Cuál es la diferencia entre formatear y minificar JSON?", en: "What is the difference between formatting and minifying JSON?", hi: "JSON \u0915\u094B \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F \u0915\u0930\u0928\u0947 \u0914\u0930 \u091B\u094B\u091F\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u092C\u0940\u091A \u0915\u094D\u092F\u093E \u0905\u0902\u0924\u0930 \u0939\u0948?" },
                answer: {
                    es: "Formatear agrega saltos de línea e indentación para leer mejor. Minificar elimina espacios innecesarios para dejar el JSON compacto.",
                    en: "Formatting adds line breaks and indentation for readability. Minifying removes unnecessary spaces to keep the JSON compact.",
                    hi: "\u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u093F\u0902\u0917 \u092A\u0920\u0928\u0940\u092F\u0924\u093E \u0915\u0947 \u0932\u093F\u090F \u0932\u093E\u0907\u0928 \u092C\u094D\u0930\u0947\u0915 \u0914\u0930 \u0907\u0902\u0921\u0947\u0902\u091F\u0947\u0936\u0928 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964 JSON \u0915\u094B \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u092C\u0928\u093E\u090F \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0928\u094D\u092F\u0942\u0928\u0924\u092E\u0915\u0930\u0923 \u0905\u0928\u093E\u0935\u0936\u094D\u092F\u0915 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0915\u094B \u0939\u091F\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El JSON se envía al servidor?", en: "Is the JSON sent to a server?", hi: "\u0915\u094D\u092F\u093E JSON \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. El formateo y la validación ocurren localmente en tu navegador.",
                    en: "No. Formatting and validation happen locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u093F\u0902\u0917 \u0914\u0930 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "uuid-generator": {
        intro: {
            es: "Genera UUID v4 aleatorios o UUID mezclados con un texto base directamente en tu navegador.",
            en: "Generate random UUID v4 values or UUIDs mixed with base text directly in your browser.",
            hi: "\u0938\u0940\u0927\u0947 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u092C\u0947\u0938 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0947 \u0938\u093E\u0925 \u092E\u093F\u0936\u094D\u0930\u093F\u0924 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u0935\u09404 \u092E\u093E\u0928 \u092F\u093E \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué genera", en: "What it generates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Puedes crear uno o varios UUID v4 aleatorios para pruebas, bases de datos, APIs, registros, mocks o identificadores internos.",
                        en: "You can create one or many random UUID v4 values for tests, databases, APIs, records, mocks, or internal identifiers.",
                        hi: "\u0906\u092A \u092A\u0930\u0940\u0915\u094D\u0937\u0923, \u0921\u0947\u091F\u093E\u092C\u0947\u0938, \u090F\u092A\u0940\u0906\u0908, \u0930\u093F\u0915\u0949\u0930\u094D\u0921, \u092E\u0949\u0915 \u092F\u093E \u0906\u0902\u0924\u0930\u093F\u0915 \u092A\u0939\u091A\u093E\u0928\u0915\u0930\u094D\u0924\u093E\u0913\u0902 \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u092F\u093E \u0915\u0908 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 v4 \u092E\u093E\u0928 \u092C\u0928\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "También puedes usar un texto base para influir en la generación. Cada clic mezcla ese texto con nueva aleatoriedad local, así que los UUID cambian entre intentos.",
                        en: "You can also use base text to influence generation. Each click mixes that text with fresh local randomness, so UUIDs change between attempts.",
                        hi: "\u0906\u092A \u092A\u0940\u0922\u093C\u0940 \u0915\u094B \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u0927\u093E\u0930 \u092A\u093E\u0920 \u0915\u093E \u092D\u0940 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0915\u094D\u0932\u093F\u0915 \u0909\u0938 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0924\u093E\u091C\u093C\u093E \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915\u0924\u093E \u0915\u0947 \u0938\u093E\u0925 \u092E\u093F\u0932\u093E\u0924\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u092A\u094D\u0930\u092F\u093E\u0938\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u092C\u0926\u0932 \u091C\u093E\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Privacidad y uso", en: "Privacy and use", hi: "\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0914\u0930 \u0909\u092A\u092F\u094B\u0917" },
                body: [
                    {
                        es: "La generación ocurre localmente en el navegador. Los UUID y el texto base no se envían a un servidor de Tools Platforms.",
                        en: "Generation happens locally in the browser. UUIDs and base text are not sent to a Tools Platforms server.",
                        hi: "\u091C\u0947\u0928\u0930\u0947\u0936\u0928 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948\u0964 \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u0914\u0930 \u092C\u0947\u0938 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091F\u0942\u0932\u094D\u0938 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u0947 \u091C\u093E\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Evita usar datos sensibles como texto base. Un UUID sirve como identificador, no como contraseña ni token secreto.",
                        en: "Avoid using sensitive data as base text. A UUID is useful as an identifier, not as a password or secret token.",
                        hi: "\u0938\u0902\u0935\u0947\u0926\u0928\u0936\u0940\u0932 \u0921\u0947\u091F\u093E \u0915\u094B \u0906\u0927\u093E\u0930 \u092A\u093E\u0920 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092C\u091A\u0947\u0902\u0964 \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u090F\u0915 \u092A\u0939\u091A\u093E\u0928\u0915\u0930\u094D\u0924\u093E \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948, \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092F\u093E \u0917\u0941\u092A\u094D\u0924 \u091F\u094B\u0915\u0928 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0928\u0939\u0940\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Qué es un UUID v4?", en: "What is a UUID v4?", hi: "UUID v4 \u0915\u094D\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "Es un identificador de 128 bits generado con aleatoriedad. Se usa para crear IDs con una probabilidad muy baja de repetirse.",
                    en: "It is a 128-bit identifier generated with randomness. It is used to create IDs with a very low chance of collision.",
                    hi: "\u092F\u0939 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915\u0924\u093E \u0938\u0947 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 128-\u092C\u093F\u091F \u092A\u0939\u091A\u093E\u0928\u0915\u0930\u094D\u0924\u093E \u0939\u0948\u0964 \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u091F\u0915\u0930\u093E\u0935 \u0915\u0940 \u092C\u0939\u0941\u0924 \u0915\u092E \u0938\u0902\u092D\u093E\u0935\u0928\u093E \u0935\u093E\u0932\u0940 \u0906\u0908\u0921\u0940 \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo generar UUID desde texto?", en: "Can I generate UUIDs from text?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0938\u0947 \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0902?" },
                answer: {
                    es: "Sí. El modo desde texto mezcla tu texto base con aleatoriedad local para crear UUID nuevos en cada generación.",
                    en: "Yes. From text mode mixes your base text with local randomness to create new UUIDs on each generation.",
                    hi: "\u0939\u093E\u0901\u0964 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092E\u094B\u0921 \u0938\u0947 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0940\u0922\u093C\u0940 \u092A\u0930 \u0928\u090F \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u092A\u0915\u0947 \u092C\u0947\u0938 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915\u0924\u093E \u0915\u0947 \u0938\u093E\u0925 \u092E\u093F\u0932\u093E\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Los UUID se envían al servidor?", en: "Are UUIDs sent to a server?", hi: "\u0915\u094D\u092F\u093E \u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u0947 \u091C\u093E\u0924\u0947 \u0939\u0948\u0902?" },
                answer: {
                    es: "No. La herramienta funciona localmente en tu navegador.",
                    en: "No. The tool works locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u091F\u0942\u0932 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "hash-generator": {
        intro: {
            es: "Genera hashes SHA-256, SHA-1, SHA-384 y SHA-512 directamente en tu navegador para comparar texto, revisar cambios o crear huellas técnicas.",
            en: "Generate SHA-256, SHA-1, SHA-384, and SHA-512 hashes directly in your browser to compare text, review changes, or create technical fingerprints.",
            hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947, \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u094B\u0902 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0947 \u092F\u093E \u0924\u0915\u0928\u0940\u0915\u0940 \u092B\u093C\u093F\u0902\u0917\u0930\u092A\u094D\u0930\u093F\u0902\u091F \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u0940\u0927\u0947 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 SHA-256, SHA-1, SHA-384 \u0914\u0930 SHA-512 \u0939\u0948\u0936 \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué hace", en: "What it does", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Convierte texto en una huella hash usando algoritmos SHA comunes. Puedes generar un hash para todo el texto o procesar cada línea por separado.",
                        en: "It converts text into a hash fingerprint using common SHA algorithms. You can generate one hash for the full text or process each line separately.",
                        hi: "\u092F\u0939 \u0938\u093E\u092E\u093E\u0928\u094D\u092F SHA \u090F\u0932\u094D\u0917\u094B\u0930\u093F\u0926\u092E \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0939\u0948\u0936 \u092B\u093C\u093F\u0902\u0917\u0930\u092A\u094D\u0930\u093F\u0902\u091F \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0906\u092A \u092A\u0942\u0930\u094D\u0923 \u092A\u093E\u0920 \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0939\u0948\u0936 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u092F\u093E \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0902\u0915\u094D\u0924\u093F \u0915\u094B \u0905\u0932\u0917 \u0938\u0947 \u0938\u0902\u0938\u093E\u0927\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "Sirve para comparar contenido, detectar cambios, preparar pruebas técnicas o crear identificadores derivados de texto.",
                        en: "It helps compare content, detect changes, prepare technical tests, or create identifiers derived from text.",
                        hi: "\u092F\u0939 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947, \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u094B\u0902 \u0915\u093E \u092A\u0924\u093E \u0932\u0917\u093E\u0928\u0947, \u0924\u0915\u0928\u0940\u0915\u0940 \u092A\u0930\u0940\u0915\u094D\u0937\u0923 \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0928\u0947 \u092F\u093E \u092A\u093E\u0920 \u0938\u0947 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u092A\u0939\u091A\u093E\u0928\u0915\u0930\u094D\u0924\u093E \u092C\u0928\u093E\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Privacidad y límites", en: "Privacy and limits", hi: "\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0914\u0930 \u0938\u0940\u092E\u093E\u090F\u0901" },
                body: [
                    {
                        es: "El cálculo ocurre localmente en tu navegador. El texto no se envía a un servidor de Tools Platforms.",
                        en: "The calculation happens locally in your browser. The text is not sent to a Tools Platforms server.",
                        hi: "\u0917\u0923\u0928\u093E \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u0940 \u0939\u0948\u0964 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091F\u0942\u0932\u094D\u0938 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u093E \u091C\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Un hash no es cifrado y no se puede desencriptar como si fuera un mensaje oculto. Para contraseñas reales se necesitan sistemas especializados con sal y derivación de claves.",
                        en: "A hash is not encryption and cannot be decrypted like a hidden message. Real passwords require specialized salted key-derivation systems.",
                        hi: "\u0939\u0948\u0936 \u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0928\u0939\u0940\u0902 \u0939\u0948 \u0914\u0930 \u0907\u0938\u0947 \u091B\u093F\u092A\u0947 \u0939\u0941\u090F \u0938\u0902\u0926\u0947\u0936 \u0915\u0940 \u0924\u0930\u0939 \u0921\u093F\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0928\u0939\u0940\u0902 \u0915\u093F\u092F\u093E \u091C\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964 \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0936\u0947\u0937 \u0928\u092E\u0915\u0940\u0928 \u0915\u0941\u0902\u091C\u0940-\u0935\u094D\u092F\u0941\u0924\u094D\u092A\u0928\u094D\u0928 \u092A\u094D\u0930\u0923\u093E\u0932\u093F\u092F\u094B\u0902 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Un hash es lo mismo que cifrar?", en: "Is hashing the same as encryption?", hi: "\u0915\u094D\u092F\u093E \u0939\u0948\u0936\u093F\u0902\u0917 \u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0915\u0947 \u0938\u092E\u093E\u0928 \u0939\u0948?" },
                answer: {
                    es: "No. El cifrado busca poder recuperar el contenido con una clave. Un hash es una huella de una sola vía para comparar o verificar datos.",
                    en: "No. Encryption is meant to recover content with a key. A hash is a one-way fingerprint for comparison or verification.",
                    hi: "\u0928\u0939\u0940\u0902, \u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0915\u093E \u0905\u0930\u094D\u0925 \u090F\u0915 \u0915\u0941\u0902\u091C\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u094B \u092A\u0941\u0928\u0930\u094D\u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0928\u093E \u0939\u0948\u0964 \u0939\u0948\u0936 \u0924\u0941\u0932\u0928\u093E \u092F\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u0924\u0930\u092B\u093C\u093E \u092B\u093C\u093F\u0902\u0917\u0930\u092A\u094D\u0930\u093F\u0902\u091F \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo generar SHA-256 online?", en: "Can I generate SHA-256 online?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 SHA-256 \u0911\u0928\u0932\u093E\u0907\u0928 \u091C\u0928\u0930\u0947\u091F \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Elige SHA-256, pega el texto y genera el hash localmente en tu navegador.",
                    en: "Yes. Choose SHA-256, paste the text, and generate the hash locally in your browser.",
                    hi: "\u0939\u093E\u0901\u0964 SHA-256 \u091A\u0941\u0928\u0947\u0902, \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902, \u0914\u0930 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u0948\u0936 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "¿El texto se envía al servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La herramienta usa Web Crypto en el navegador y no envía el texto a Tools Platforms.",
                    en: "No. The tool uses Web Crypto in the browser and does not send the text to Tools Platforms.",
                    hi: "\u0928\u0939\u0940\u0902, \u091F\u0942\u0932 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0935\u0947\u092C \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u091F\u0942\u0932 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u092A\u0930 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "base64-converter": {
        intro: {
            es: "Codifica texto a Base64 o decodifica Base64 a texto de forma local en el navegador.",
            en: "Encode text to Base64 or decode Base64 to text locally in your browser.",
            hi: "\u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u092C\u0947\u093864 \u092A\u0930 \u090F\u0928\u0915\u094B\u0921 \u0915\u0930\u0947\u0902 \u092F\u093E \u092C\u0947\u093864 \u0915\u094B \u0921\u0940\u0915\u094B\u0921 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué hace", en: "What it does", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Convierte texto UTF-8 a Base64 para usarlo en APIs, pruebas, tokens, payloads o datos técnicos.",
                        en: "It converts UTF-8 text to Base64 for APIs, tests, tokens, payloads, or technical data.",
                        hi: "\u092F\u0939 \u090F\u092A\u0940\u0906\u0908, \u092A\u0930\u0940\u0915\u094D\u0937\u0923, \u091F\u094B\u0915\u0928, \u092A\u0947\u0932\u094B\u0921 \u092F\u093E \u0924\u0915\u0928\u0940\u0915\u0940 \u0921\u0947\u091F\u093E \u0915\u0947 \u0932\u093F\u090F \u092F\u0942\u091F\u0940\u090F\u092B -8 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u092C\u0947\u0938 64 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También decodifica Base64 válido y muestra el texto resultante, con opción para procesar cada línea por separado.",
                        en: "It also decodes valid Base64 and shows the resulting text, with an option to process each line separately.",
                        hi: "\u092F\u0939 \u0935\u0948\u0927 \u092C\u0947\u093864 \u0915\u094B \u092D\u0940 \u0921\u093F\u0915\u094B\u0921 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0902\u0915\u094D\u0924\u093F \u0915\u094B \u0905\u0932\u0917 \u0938\u0947 \u0938\u0902\u0938\u093E\u0927\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0935\u093F\u0915\u0932\u094D\u092A \u0915\u0947 \u0938\u093E\u0925 \u092A\u0930\u093F\u0923\u093E\u092E\u0940 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Opciones útiles", en: "Useful options", hi: "\u0909\u092A\u092F\u094B\u0917\u0940 \u0935\u093F\u0915\u0932\u094D\u092A" },
                body: [
                    {
                        es: "El resultado se puede copiar o descargar como TXT sin enviar el contenido a un servidor.",
                        en: "The result can be copied or downloaded as TXT without sending the content to a server.",
                        hi: "\u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u094B \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u092A\u0930\u093F\u0923\u093E\u092E \u0915\u094B TXT \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0915\u0949\u092A\u0940 \u092F\u093E \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u093F\u092F\u093E \u091C\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También puedes activar formato URL-safe para generar Base64 útil en URLs, tokens o JWT.",
                        en: "You can also enable URL-safe format to generate Base64 that works well in URLs, tokens, or JWTs.",
                        hi: "\u0906\u092A \u092C\u0947\u093864 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092F\u0942\u0906\u0930\u090F\u0932-\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u094B \u092D\u0940 \u0938\u0915\u094D\u0937\u092E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u091C\u094B \u092F\u0942\u0906\u0930\u090F\u0932, \u091F\u094B\u0915\u0928 \u092F\u093E \u091C\u0947\u0921\u092C\u094D\u0932\u094D\u092F\u0942\u091F\u0940 \u092E\u0947\u0902 \u0905\u091A\u094D\u091B\u093E \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Base64 es cifrado?", en: "Is Base64 encryption?", hi: "\u0915\u094D\u092F\u093E \u092C\u0947\u093864 \u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0939\u0948?" },
                answer: {
                    es: "No. Base64 es una codificación, no protege el contenido. Cualquier persona puede decodificarlo si tiene el texto.",
                    en: "No. Base64 is encoding, not protection. Anyone can decode it if they have the text.",
                    hi: "\u0928\u0939\u0940\u0902, \u092C\u0947\u093864 \u090F\u0928\u094D\u0915\u094B\u0921\u093F\u0902\u0917 \u0939\u0948, \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0928\u0939\u0940\u0902\u0964 \u092F\u0926\u093F \u0915\u093F\u0938\u0940 \u0915\u0947 \u092A\u093E\u0938 \u092A\u093E\u0920 \u0939\u0948 \u0924\u094B \u0935\u0939 \u0907\u0938\u0947 \u0921\u093F\u0915\u094B\u0921 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El texto se envía al servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La codificación y decodificación se hacen en tu navegador.",
                    en: "No. Encoding and decoding happen in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u090F\u0928\u094D\u0915\u094B\u0921\u093F\u0902\u0917 \u0914\u0930 \u0921\u093F\u0915\u094B\u0921\u093F\u0902\u0917 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u0940 \u0939\u0948\u0964"
                }
            }
        ]
    },
    "html-preview": {
        intro: {
            es: "Genera una vista previa de HTML online sin ejecutar scripts y sin enviar el código a un servidor.",
            en: "Generate an online HTML preview without running scripts or sending code to a server.",
            hi: "\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u091A\u0932\u093E\u090F \u092C\u093F\u0928\u093E \u092F\u093E \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0915\u094B\u0921 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u0911\u0928\u0932\u093E\u0907\u0928 HTML \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Qué muestra", en: "What it shows", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Pega marcado HTML y revisa cómo se renderiza en una vista previa aislada dentro del navegador.",
                        en: "Paste HTML markup and see how it renders in an isolated preview inside the browser.",
                        hi: "HTML \u092E\u093E\u0930\u094D\u0915\u0905\u092A \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902 \u0914\u0930 \u0926\u0947\u0916\u0947\u0902 \u0915\u093F \u092F\u0939 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u0915\u0947 \u0905\u0902\u0926\u0930 \u090F\u0915 \u0905\u0932\u0917 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u092E\u0947\u0902 \u0915\u0948\u0938\u0947 \u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Funciona bien para revisar estructuras, estilos inline, bloques de contenido, tablas, snippets y componentes estáticos.",
                        en: "It works well for checking structures, inline styles, content blocks, tables, snippets, and static components.",
                        hi: "\u092F\u0939 \u0938\u0902\u0930\u091A\u0928\u093E\u0913\u0902, \u0907\u0928\u0932\u093E\u0907\u0928 \u0936\u0948\u0932\u093F\u092F\u094B\u0902, \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u092C\u094D\u0932\u0949\u0915\u094B\u0902, \u0924\u093E\u0932\u093F\u0915\u093E\u0913\u0902, \u0938\u094D\u0928\u093F\u092A\u0947\u091F\u094D\u0938 \u0914\u0930 \u0938\u094D\u0925\u093F\u0930 \u0918\u091F\u0915\u094B\u0902 \u0915\u0940 \u091C\u093E\u0901\u091A \u0915\u0947 \u0932\u093F\u090F \u0905\u091A\u094D\u091B\u0940 \u0924\u0930\u0939 \u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Seguridad", en: "Safety", hi: "\u0938\u0941\u0930\u0915\u094D\u0937\u093E" },
                body: [
                    {
                        es: "La herramienta elimina scripts, eventos inline y enlaces JavaScript antes de mostrar la vista previa.",
                        en: "The tool removes scripts, inline events, and javascript: links before showing the preview.",
                        hi: "\u091F\u0942\u0932 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u0926\u093F\u0916\u093E\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F, \u0907\u0928\u0932\u093E\u0907\u0928 \u0908\u0935\u0947\u0902\u091F \u0914\u0930 \u091C\u093E\u0935\u093E\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F: \u0932\u093F\u0902\u0915 \u0939\u091F\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "El resultado se renderiza en un iframe sin permisos de script para reducir riesgos mientras revisas HTML pegado.",
                        en: "The result renders in an iframe without script permissions to reduce risk while checking pasted HTML.",
                        hi: "\u091A\u093F\u092A\u0915\u093E\u090F \u0917\u090F HTML \u0915\u0940 \u091C\u093E\u0901\u091A \u0915\u0930\u0924\u0947 \u0938\u092E\u092F \u091C\u094B\u0916\u093F\u092E \u0915\u094B \u0915\u092E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092A\u0930\u093F\u0923\u093E\u092E \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0905\u0928\u0941\u092E\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u093F\u0928\u093E \u090F\u0915 iframe \u092E\u0947\u0902 \u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Puedo previsualizar HTML con CSS?", en: "Can I preview HTML with CSS?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 CSS \u0915\u0947 \u0938\u093E\u0925 HTML \u0915\u093E \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Puedes incluir estilos inline o etiquetas style. La vista previa intenta renderizarlos junto con el HTML.",
                    en: "Yes. You can include inline styles or style tags. The preview attempts to render them together with the HTML.",
                    hi: "\u0939\u093E\u0901\u0964 \u0906\u092A \u0907\u0928\u0932\u093E\u0907\u0928 \u0938\u094D\u091F\u093E\u0907\u0932 \u092F\u093E \u0938\u094D\u091F\u093E\u0907\u0932 \u091F\u0948\u0917 \u0936\u093E\u092E\u093F\u0932 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u0909\u0928\u094D\u0939\u0947\u0902 HTML \u0915\u0947 \u0938\u093E\u0925 \u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924 \u0915\u0930\u0928\u0947 \u0915\u093E \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Ejecuta JavaScript?", en: "Does it run JavaScript?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u091C\u093E\u0935\u093E\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u091A\u0932\u093E\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Por seguridad, los scripts y eventos inline se eliminan y el iframe no tiene permisos para ejecutar JavaScript.",
                    en: "No. For safety, scripts and inline events are removed and the iframe has no permission to run JavaScript.",
                    hi: "\u0928\u0939\u0940\u0902, \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u0947 \u0932\u093F\u090F, \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0914\u0930 \u0907\u0928\u0932\u093E\u0907\u0928 \u0908\u0935\u0947\u0902\u091F \u0939\u091F\u093E \u0926\u093F\u090F \u091C\u093E\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0906\u0908\u092B\u093C\u094D\u0930\u0947\u092E \u0915\u094B \u091C\u093E\u0935\u093E\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u091A\u0932\u093E\u0928\u0947 \u0915\u0940 \u0915\u094B\u0908 \u0905\u0928\u0941\u092E\u0924\u093F \u0928\u0939\u0940\u0902 \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿El código se envía al servidor?", en: "Is the code sent to a server?", hi: "\u0915\u094D\u092F\u093E \u0915\u094B\u0921 \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La limpieza y la vista previa se hacen en tu navegador.",
                    en: "No. Cleanup and preview happen in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0938\u092B\u093C\u093E\u0908 \u0914\u0930 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "html-formatter-minifier": {
        intro: {
            es: "Formatea HTML para revisarlo con más claridad o minifícalo para obtener una versión compacta sin enviar el código a un servidor.",
            en: "Format HTML so it is easier to review or minify it into a compact version without sending code to a server.",
            hi: "HTML \u0915\u094B \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930\u0947\u0902 \u0924\u093E\u0915\u093F \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0915\u094B\u0921 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u0907\u0938\u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u093E \u092F\u093E \u0907\u0938\u0947 \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u092E\u0947\u0902 \u091B\u094B\u091F\u093E \u0915\u0930\u0928\u093E \u0906\u0938\u093E\u0928 \u0939\u094B\u0964"
        },
        sections: [
            {
                title: { es: "Qué hace", en: "What it does", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Organiza etiquetas HTML con saltos de línea e indentación para que el marcado sea más fácil de leer.",
                        en: "It organizes HTML tags with line breaks and indentation so markup is easier to read.",
                        hi: "\u092F\u0939 HTML \u091F\u0948\u0917 \u0915\u094B \u0932\u093E\u0907\u0928 \u092C\u094D\u0930\u0947\u0915 \u0914\u0930 \u0907\u0902\u0921\u0947\u0902\u091F\u0947\u0936\u0928 \u0915\u0947 \u0938\u093E\u0925 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F \u092E\u093E\u0930\u094D\u0915\u0905\u092A \u0915\u094B \u092A\u0922\u093C\u0928\u093E \u0906\u0938\u093E\u0928 \u0939\u094B\u0964"
                    },
                    {
                        es: "También puede minificar HTML reduciendo espacios entre etiquetas y líneas vacías cuando necesitas una versión más compacta.",
                        en: "It can also minify HTML by reducing whitespace between tags and empty lines when you need a more compact version.",
                        hi: "\u091C\u092C \u0906\u092A\u0915\u094B \u0905\u0927\u093F\u0915 \u0915\u0949\u092E\u094D\u092A\u0948\u0915\u094D\u091F \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B\u0924\u0940 \u0939\u0948 \u0924\u094B \u092F\u0939 \u091F\u0948\u0917 \u0914\u0930 \u0916\u093E\u0932\u0940 \u0932\u093E\u0907\u0928\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0915\u094B \u0915\u092E \u0915\u0930\u0915\u0947 HTML \u0915\u094B \u091B\u094B\u091F\u093E \u092D\u0940 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Uso recomendado", en: "Recommended use", hi: "\u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0909\u092A\u092F\u094B\u0917" },
                body: [
                    {
                        es: "Úsalo para revisar snippets, plantillas, correos HTML, componentes estáticos o bloques copiados desde otra herramienta.",
                        en: "Use it to review snippets, templates, HTML emails, static components, or blocks copied from another tool.",
                        hi: "\u0938\u094D\u0928\u093F\u092A\u0947\u091F, \u091F\u0947\u092E\u094D\u092A\u094D\u0932\u0947\u091F, HTML \u0908\u092E\u0947\u0932, \u0938\u094D\u0925\u093F\u0930 \u0918\u091F\u0915\u094B\u0902 \u092F\u093E \u0915\u093F\u0938\u0940 \u0905\u0928\u094D\u092F \u091F\u0942\u0932 \u0938\u0947 \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u092C\u094D\u0932\u0949\u0915 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "El resultado no se actualiza hasta presionar el botón de nuevo, así puedes cambiar opciones sin alterar una salida ya generada.",
                        en: "The result does not update until you press the button again, so you can change options without altering an already generated output.",
                        hi: "\u091C\u092C \u0924\u0915 \u0906\u092A \u0926\u094B\u092C\u093E\u0930\u093E \u092C\u091F\u0928 \u0928\u0939\u0940\u0902 \u0926\u092C\u093E\u0924\u0947 \u0924\u092C \u0924\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0905\u092A\u0921\u0947\u091F \u0928\u0939\u0940\u0902 \u0939\u094B\u0924\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0906\u092A \u092A\u0939\u0932\u0947 \u0938\u0947 \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u093F\u090F \u0917\u090F \u0906\u0909\u091F\u092A\u0941\u091F \u092E\u0947\u0902 \u092C\u0926\u0932\u093E\u0935 \u0915\u093F\u090F \u092C\u093F\u0928\u093E \u0935\u093F\u0915\u0932\u094D\u092A \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿El HTML se ejecuta?", en: "Does the HTML execute?", hi: "\u0915\u094D\u092F\u093E HTML \u0928\u093F\u0937\u094D\u092A\u093E\u0926\u093F\u0924 \u0939\u094B\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Esta herramienta trata el HTML como texto: lo formatea o lo minifica, pero no lo renderiza ni ejecuta scripts.",
                    en: "No. This tool treats HTML as text: it formats or minifies it, but it does not render it or execute scripts.",
                    hi: "\u0928\u0939\u0940\u0902, \u092F\u0939 \u091F\u0942\u0932 HTML \u0915\u094B \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u092E\u093E\u0928\u0924\u093E \u0939\u0948: \u092F\u0939 \u0907\u0938\u0947 \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948 \u092F\u093E \u091B\u094B\u091F\u093E \u0915\u0930\u0924\u093E \u0939\u0948, \u0932\u0947\u0915\u093F\u0928 \u092F\u0939 \u0907\u0938\u0947 \u0930\u0947\u0902\u0921\u0930 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948 \u092F\u093E \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0928\u093F\u0937\u094D\u092A\u093E\u0926\u093F\u0924 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "¿Puedo eliminar comentarios HTML?", en: "Can I remove HTML comments?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 HTML \u091F\u093F\u092A\u094D\u092A\u0923\u093F\u092F\u093E\u0901 \u0939\u091F\u093E \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Puedes activar la opción para quitar bloques de comentarios antes de generar el resultado.",
                    en: "Yes. You can enable the option to remove comment blocks before generating the result.",
                    hi: "\u0939\u093E\u0901\u0964 \u0906\u092A \u092A\u0930\u093F\u0923\u093E\u092E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u091F\u093F\u092A\u094D\u092A\u0923\u0940 \u092C\u094D\u0932\u0949\u0915 \u0939\u091F\u093E\u0928\u0947 \u0915\u093E \u0935\u093F\u0915\u0932\u094D\u092A \u0938\u0915\u094D\u0937\u092E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: { es: "¿El código se envía al servidor?", en: "Is the code sent to a server?", hi: "\u0915\u094D\u092F\u093E \u0915\u094B\u0921 \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La transformación se hace localmente en tu navegador.",
                    en: "No. The transformation happens locally in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "case-style-converter": {
        intro: {
            es: "Convierte frases a estilos usados en programación, documentación técnica y nombres de variables.",
            en: "Convert phrases into naming styles used in programming, technical docs, and variable names.",
            hi: "\u0935\u093E\u0915\u094D\u092F\u093E\u0902\u0936\u094B\u0902 \u0915\u094B \u092A\u094D\u0930\u094B\u0917\u094D\u0930\u093E\u092E\u093F\u0902\u0917, \u0924\u0915\u0928\u0940\u0915\u0940 \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u094B\u0902 \u0914\u0930 \u091A\u0930 \u0928\u093E\u092E\u094B\u0902 \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u0940 \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0940 \u0928\u093E\u092E\u0915\u0930\u0923 \u0936\u0948\u0932\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Formatos incluidos", en: "Included formats", hi: "\u0936\u093E\u092E\u093F\u0932 \u092A\u094D\u0930\u093E\u0930\u0942\u092A" },
                body: [
                    {
                        es: "Genera camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case y otros estilos comunes.",
                        en: "Generate camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and other common styles.",
                        hi: "\u0915\u0948\u092E\u0932\u0915\u0947\u0938, \u092A\u093E\u0938\u094D\u0915\u0932\u0915\u0947\u0938, \u0938\u094D\u0928\u0947\u0915_\u0915\u0947\u0938, \u0915\u092C\u093E\u092C-\u0915\u0947\u0938, CONSTANT_CASE, dot.case, \u0914\u0930 \u0905\u0928\u094D\u092F \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0936\u0948\u0932\u093F\u092F\u093E\u0901 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Es útil para nombrar variables, archivos, rutas, clases, constantes o claves de configuración.",
                        en: "It is useful for naming variables, files, routes, classes, constants, or config keys.",
                        hi: "\u092F\u0939 \u0935\u0947\u0930\u093F\u090F\u092C\u0932\u094D\u0938, \u092B\u093C\u093E\u0907\u0932\u094B\u0902, \u092E\u093E\u0930\u094D\u0917\u094B\u0902, \u0915\u0915\u094D\u0937\u093E\u0913\u0902, \u0938\u094D\u0925\u093F\u0930\u093E\u0902\u0915\u094B\u0902 \u092F\u093E \u0915\u0949\u0928\u094D\u092B\u093C\u093F\u0917\u0930\u0947\u0936\u0928 \u0915\u0941\u0902\u091C\u093F\u092F\u094B\u0902 \u0915\u0947 \u0928\u093E\u092E\u0915\u0930\u0923 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Cómo usarlo", en: "How to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Escribe una frase o nombre base, pulsa convertir y copia el formato que necesites.",
                        en: "Write a phrase or base name, press convert, and copy the format you need.",
                        hi: "\u090F\u0915 \u0935\u093E\u0915\u094D\u092F\u093E\u0902\u0936 \u092F\u093E \u0906\u0927\u093E\u0930 \u0928\u093E\u092E \u0932\u093F\u0916\u0947\u0902, \u0915\u0928\u094D\u0935\u0930\u094D\u091F \u0926\u092C\u093E\u090F\u0901, \u0914\u0930 \u091C\u093F\u0938 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u0940 \u0906\u092A\u0915\u094B \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948 \u0909\u0938\u0947 \u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "El resultado no cambia hasta que vuelves a presionar convertir, para evitar sorpresas mientras editas el texto.",
                        en: "The result does not change until you press convert again, so editing the text does not cause surprises.",
                        hi: "\u091C\u092C \u0924\u0915 \u0906\u092A \u0915\u0928\u094D\u0935\u0930\u094D\u091F \u0915\u094B \u0926\u094B\u092C\u093E\u0930\u093E \u0928\u0939\u0940\u0902 \u0926\u092C\u093E\u0924\u0947 \u0924\u092C \u0924\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092C\u0926\u0932\u0924\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u092A\u093E\u0920 \u0915\u094B \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0928\u0947 \u0938\u0947 \u0915\u094B\u0908 \u0906\u0936\u094D\u091A\u0930\u094D\u092F \u0928\u0939\u0940\u0902 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "¿Esto necesita backend?", en: "Does this need a backend?", hi: "\u0915\u094D\u092F\u093E \u0907\u0938\u0915\u0947 \u0932\u093F\u090F \u092C\u0948\u0915\u090F\u0902\u0921 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. La conversión ocurre en el navegador.",
                    en: "No. The conversion happens in the browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u093E \u0939\u0948."
                }
            },
            {
                question: { es: "¿Cuál formato uso para JavaScript?", en: "Which format should I use for JavaScript?", hi: "\u092E\u0941\u091D\u0947 \u091C\u093E\u0935\u093E\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0915\u0947 \u0932\u093F\u090F \u0915\u093F\u0938 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u093F\u090F?" },
                answer: {
                    es: "Para variables suele usarse camelCase; para clases o componentes, PascalCase.",
                    en: "camelCase is commonly used for variables; PascalCase for classes or components.",
                    hi: "\u0915\u0948\u092E\u0932\u0915\u0947\u0938 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0935\u0947\u0930\u093F\u090F\u092C\u0932\u094D\u0938 \u0915\u0947 \u0932\u093F\u090F \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948; \u0915\u0915\u094D\u0937\u093E\u0913\u0902 \u092F\u093E \u0918\u091F\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092A\u093E\u0938\u094D\u0915\u0932\u0915\u0947\u0938\u0964"
                }
            }
        ]
    },
    "annual-salary": {
        intro: {
            es: "Calcula tu salario anual estimado en Colombia con salario mensual bruto, auxilio de transporte, prima de servicios y descuentos de nomina.",
            en: "Estimate annual salary in Colombia with gross monthly salary, transportation allowance, service bonus, and payroll deductions.",
            hi: "\u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928, \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0914\u0930 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Que incluye", en: "What it includes", hi: "\u0907\u0938\u092E\u0947\u0902 \u0915\u094D\u092F\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948" },
                body: [
                    {
                        es: "La herramienta parte del salario mensual bruto y calcula salario base anual, auxilio de transporte anual si aplica y prima de servicios estimada.",
                        en: "The tool starts from gross monthly salary and calculates annual base salary, annual transportation allowance when applicable, and estimated service bonus.",
                        hi: "\u0909\u092A\u0915\u0930\u0923 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u093E \u0939\u0948 \u0914\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0906\u0927\u093E\u0930 \u0935\u0947\u0924\u0928, \u0932\u093E\u0917\u0942 \u0939\u094B\u0928\u0947 \u092A\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u0914\u0930 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También puede restar salud, pensión y Fondo de Solidaridad cuando el salario supera los límites legales.",
                        en: "It can also subtract health, pension, and solidarity fund when salary exceeds the legal thresholds.",
                        hi: "\u091C\u092C \u0935\u0947\u0924\u0928 \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u0940\u092E\u093E \u0938\u0947 \u0905\u0927\u093F\u0915 \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948 \u0924\u094B \u092F\u0939 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0915\u094B \u092D\u0940 \u0918\u091F\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Reglas Colombia", en: "Colombia rules", hi: "\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0928\u093F\u092F\u092E" },
                body: [
                    {
                        es: "El año de reglas define salario mínimo, auxilio de transporte y límites para saber si el auxilio aplica.",
                        en: "The rule year defines minimum wage, transportation allowance, and thresholds used to decide whether the allowance applies.",
                        hi: "\u0928\u093F\u092F\u092E \u0935\u0930\u094D\u0937 \u0928\u094D\u092F\u0942\u0928\u0924\u092E \u0935\u0947\u0924\u0928, \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E \u0914\u0930 \u0938\u0940\u092E\u093E \u0915\u094B \u092A\u0930\u093F\u092D\u093E\u0937\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948 \u091C\u093F\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u092F\u0939 \u0924\u092F \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u093F\u092F\u093E \u091C\u093E\u0924\u093E \u0939\u0948 \u0915\u093F \u092D\u0924\u094D\u0924\u093E \u0932\u093E\u0917\u0942 \u0939\u094B\u0924\u093E \u0939\u0948 \u092F\u093E \u0928\u0939\u0940\u0902\u0964"
                    },
                    {
                        es: "No reemplaza una colilla de pago ni incluye retencion en la fuente, cesantias, vacaciones, pagos variables o acuerdos internos.",
                        en: "It does not replace a payslip and does not include withholding tax, severance, vacation, variable pay, or internal agreements.",
                        hi: "\u092F\u0939 \u0935\u0947\u0924\u0928 \u092A\u0930\u094D\u091A\u0940 \u0915\u094B \u092A\u094D\u0930\u0924\u093F\u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u093E \u0939\u0948 \u0914\u0930 \u0907\u0938\u092E\u0947\u0902 \u0930\u094B\u0915\u0947 \u0917\u090F \u0915\u0930, \u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u0905\u0935\u0915\u093E\u0936, \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0940\u092F \u0935\u0947\u0924\u0928 \u092F\u093E \u0906\u0902\u0924\u0930\u093F\u0915 \u0938\u092E\u091D\u094C\u0924\u0947 \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "Que salario debo escribir?", en: "Which salary should I enter?", hi: "\u092E\u0941\u091D\u0947 \u0915\u094C\u0928 \u0938\u093E \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u093F\u090F?" },
                answer: {
                    es: "Escribe el salario mensual bruto, antes de salud, pension u otros descuentos.",
                    en: "Enter the gross monthly salary before health, pension, or other deductions.",
                    hi: "\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928, \u092F\u093E \u0905\u0928\u094D\u092F \u0915\u091F\u094C\u0924\u093F\u092F\u094B\u0902 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "Incluye prima de servicios?", en: "Does it include service bonus?", hi: "\u0915\u094D\u092F\u093E \u0907\u0938\u092E\u0947\u0902 \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948?" },
                answer: {
                    es: "Si activas la opcion, suma una prima anual estimada equivalente a los dos pagos semestrales.",
                    en: "If enabled, it adds an estimated annual service bonus equal to the two half-year payments.",
                    hi: "\u092F\u0926\u093F \u0938\u0915\u094D\u0937\u092E \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948, \u0924\u094B \u092F\u0939 \u0926\u094B \u091B\u092E\u093E\u0939\u0940 \u092D\u0941\u0917\u0924\u093E\u0928\u094B\u0902 \u0915\u0947 \u092C\u0930\u093E\u092C\u0930 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u091C\u094B\u0921\u093C\u0924\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "word-character-counter": {
        intro: {
            es: "Cuenta palabras, caracteres, letras, líneas, párrafos, frases y tiempo de lectura de un texto en segundos.",
            en: "Count words, characters, letters, lines, paragraphs, sentences, and reading time in seconds.",
            hi: "\u0936\u092C\u094D\u0926\u094B\u0902, \u0935\u0930\u094D\u0923\u094B\u0902, \u0905\u0915\u094D\u0937\u0930\u094B\u0902, \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902, \u092A\u0948\u0930\u093E\u0917\u094D\u0930\u093E\u092B\u094B\u0902, \u0935\u093E\u0915\u094D\u092F\u094B\u0902 \u0914\u0930 \u092A\u0922\u093C\u0928\u0947 \u0915\u0947 \u0938\u092E\u092F \u0915\u094B \u0938\u0947\u0915\u0902\u0921\u094B\u0902 \u092E\u0947\u0902 \u0917\u093F\u0928\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Conteo completo", en: "Complete count", hi: "\u092A\u0942\u0930\u0940 \u0917\u093F\u0928\u0924\u0940" },
                body: [
                    {
                        es: "Muestra palabras, caracteres con espacios, caracteres sin espacios, letras, números, líneas, líneas vacías, párrafos y frases.",
                        en: "It shows words, characters with spaces, characters without spaces, letters, numbers, lines, empty lines, paragraphs, and sentences.",
                        hi: "\u092F\u0939 \u0936\u092C\u094D\u0926, \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0935\u093E\u0932\u0947 \u0935\u0930\u094D\u0923, \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0930\u0939\u093F\u0924 \u0935\u0930\u094D\u0923, \u0905\u0915\u094D\u0937\u0930, \u0938\u0902\u0916\u094D\u092F\u093E\u090F\u0901, \u0930\u0947\u0916\u093E\u090F\u0901, \u0916\u093E\u0932\u0940 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901, \u092A\u0948\u0930\u093E\u0917\u094D\u0930\u093E\u092B \u0914\u0930 \u0935\u093E\u0915\u094D\u092F \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También calcula un tiempo aproximado de lectura para textos, artículos, tareas, publicaciones o contenido SEO.",
                        en: "It also estimates reading time for text, articles, assignments, posts, or SEO content.",
                        hi: "\u092F\u0939 \u092A\u093E\u0920, \u0932\u0947\u0916, \u0905\u0938\u093E\u0907\u0928\u092E\u0947\u0902\u091F, \u092A\u094B\u0938\u094D\u091F \u092F\u093E \u090F\u0938\u0908\u0913 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u0947 \u0932\u093F\u090F \u092A\u0922\u093C\u0928\u0947 \u0915\u0947 \u0938\u092E\u092F \u0915\u093E \u092D\u0940 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Uso práctico", en: "Practical use", hi: "\u0935\u094D\u092F\u093E\u0935\u0939\u093E\u0930\u093F\u0915 \u0909\u092A\u092F\u094B\u0917" },
                body: [
                    {
                        es: "Sirve para revisar límites de formularios, textos académicos, publicaciones, descripciones, guiones y documentos.",
                        en: "Use it to check form limits, academic text, posts, descriptions, scripts, and documents.",
                        hi: "\u092B\u0949\u0930\u094D\u092E \u0938\u0940\u092E\u093E, \u0905\u0915\u093E\u0926\u092E\u093F\u0915 \u092A\u093E\u0920, \u092A\u094B\u0938\u094D\u091F, \u0935\u093F\u0935\u0930\u0923, \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0914\u0930 \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u094B\u0902 \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "El conteo se hace localmente en el navegador y no cambia hasta que vuelves a contar.",
                        en: "Counting happens locally in the browser and does not change until you count again.",
                        hi: "\u0917\u093F\u0928\u0924\u0940 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0930\u0942\u092A \u0938\u0947 \u0939\u094B\u0924\u0940 \u0939\u0948 \u0914\u0930 \u0924\u092C \u0924\u0915 \u0928\u0939\u0940\u0902 \u092C\u0926\u0932\u0924\u0940 \u091C\u092C \u0924\u0915 \u0906\u092A \u0926\u094B\u092C\u093E\u0930\u093E \u0917\u093F\u0928\u0924\u0940 \u0928\u0939\u0940\u0902 \u0915\u0930\u0924\u0947\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "Cuenta caracteres con espacios?", en: "Does it count characters with spaces?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0935\u093E\u0932\u0947 \u0935\u0930\u094D\u0923\u094B\u0902 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "Sí. Muestra caracteres totales y también caracteres sin espacios.",
                    en: "Yes. It shows total characters and characters without spaces.",
                    hi: "\u0939\u093E\u0901\u0964 \u092F\u0939 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0915\u0947 \u092C\u093F\u0928\u093E \u0915\u0941\u0932 \u0935\u0930\u094D\u0923 \u0914\u0930 \u0935\u0930\u094D\u0923 \u0926\u093F\u0916\u093E\u0924\u093E \u0939\u0948\u0964"
                }
            },
            {
                question: { es: "El texto se envia al servidor?", en: "Is the text sent to a server?", hi: "\u0915\u094D\u092F\u093E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u093F\u0938\u0940 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u0939\u0948?" },
                answer: {
                    es: "No. El conteo se hace en tu navegador.",
                    en: "No. Counting happens in your browser.",
                    hi: "\u0928\u0939\u0940\u0902, \u0917\u093F\u0928\u0924\u0940 \u0906\u092A\u0915\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0939\u094B\u0924\u0940 \u0939\u0948."
                }
            }
        ]
    },
    "find-replace-text": {
        intro: {
            es: "Busca una palabra o fragmento dentro de un texto y reemplazalo por otro valor de forma rapida.",
            en: "Find a word or fragment inside text and quickly replace it with another value.",
            hi: "\u092A\u093E\u0920 \u0915\u0947 \u0905\u0902\u0926\u0930 \u0915\u094B\u0908 \u0936\u092C\u094D\u0926 \u092F\u093E \u091F\u0941\u0915\u0921\u093C\u093E \u0922\u0942\u0902\u0922\u0947\u0902 \u0914\u0930 \u0924\u0941\u0930\u0902\u0924 \u0909\u0938\u0947 \u0915\u093F\u0938\u0940 \u0905\u0928\u094D\u092F \u092E\u093E\u0928 \u0938\u0947 \u092C\u0926\u0932\u0947\u0902\u0964"
        },
        sections: [
            {
                title: { es: "Opciones de reemplazo", en: "Replacement options", hi: "\u092A\u094D\u0930\u0924\u093F\u0938\u094D\u0925\u093E\u092A\u0928 \u0935\u093F\u0915\u0932\u094D\u092A" },
                body: [
                    {
                        es: "Puedes distinguir mayusculas y minusculas cuando necesitas que Hola y hola sean diferentes.",
                        en: "You can match case when you need Hello and hello to be treated differently.",
                        hi: "\u0906\u092A \u0909\u0938 \u0938\u094D\u0925\u093F\u0924\u093F \u0915\u093E \u092E\u093F\u0932\u093E\u0928 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u091C\u092C \u0906\u092A\u0915\u094B \u0939\u0948\u0932\u094B \u0914\u0930 \u0939\u0948\u0932\u094B \u0915\u0947 \u0938\u093E\u0925 \u0905\u0932\u0917-\u0905\u0932\u0917 \u0935\u094D\u092F\u0935\u0939\u093E\u0930 \u0915\u0930\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B\u0964"
                    },
                    {
                        es: "También puedes reemplazar solo palabras completas para evitar cambios dentro de otras palabras.",
                        en: "You can also replace whole words only to avoid changing matches inside other words.",
                        hi: "\u0906\u092A \u0905\u0928\u094D\u092F \u0936\u092C\u094D\u0926\u094B\u0902 \u0915\u0947 \u0905\u0902\u0926\u0930 \u092E\u093F\u0932\u093E\u0928 \u092C\u0926\u0932\u0928\u0947 \u0938\u0947 \u092C\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0947\u0935\u0932 \u092A\u0942\u0930\u0947 \u0936\u092C\u094D\u0926\u094B\u0902 \u0915\u094B \u092D\u0940 \u092C\u0926\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Para que sirve", en: "What it is for", hi: "\u092F\u0939 \u0915\u093F\u0938 \u0932\u093F\u090F \u0939\u0948" },
                body: [
                    {
                        es: "Usalo para corregir nombres, cambiar terminos repetidos, limpiar listas, ajustar plantillas o editar textos largos.",
                        en: "Use it to fix names, change repeated terms, clean lists, adjust templates, or edit long text.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0928\u093E\u092E\u094B\u0902 \u0915\u094B \u0920\u0940\u0915 \u0915\u0930\u0928\u0947, \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u0936\u092C\u094D\u0926\u094B\u0902 \u0915\u094B \u092C\u0926\u0932\u0928\u0947, \u0938\u0942\u091A\u093F\u092F\u094B\u0902 \u0915\u094B \u0938\u093E\u092B \u0915\u0930\u0928\u0947, \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F\u094D\u0938 \u0915\u094B \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930\u0928\u0947 \u092F\u093E \u0932\u0902\u092C\u0947 \u092A\u093E\u0920 \u0915\u094B \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "La busqueda usa texto normal, no expresiones regulares, para que sea facil de manejar.",
                        en: "Search uses plain text, not regular expressions, so it stays easy to use.",
                        hi: "\u0916\u094B\u091C \u0928\u093F\u092F\u092E\u093F\u0924 \u0905\u092D\u093F\u0935\u094D\u092F\u0915\u094D\u0924\u093F \u0915\u093E \u0928\u0939\u0940\u0902, \u092C\u0932\u094D\u0915\u093F \u0938\u093E\u0926\u0947 \u092A\u093E\u0920 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u0940 \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u093E \u0906\u0938\u093E\u0928 \u0930\u0939\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "Puedo reemplazar con texto vacio?", en: "Can I replace with empty text?", hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 \u0907\u0938\u0947 \u0916\u093E\u0932\u0940 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0938\u0947 \u092C\u0926\u0932 \u0938\u0915\u0924\u093E \u0939\u0942\u0901?" },
                answer: {
                    es: "Sí. Deja el campo reemplazar vacío para eliminar las coincidencias encontradas.",
                    en: "Yes. Leave replace with empty to remove found matches.",
                    hi: "\u0939\u093E\u0901\u0964 \u092A\u093E\u090F \u0917\u090F \u092E\u093F\u0932\u093E\u0928\u094B\u0902 \u0915\u094B \u0939\u091F\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092A\u094D\u0930\u0924\u093F\u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0915\u094B \u0916\u093E\u0932\u0940 \u091B\u094B\u0921\u093C \u0926\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "Usa expresiones regulares?", en: "Does it use regular expressions?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0930\u0947\u0917\u0941\u0932\u0930 \u090F\u0915\u094D\u0938\u092A\u094D\u0930\u0947\u0936\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "No. Esta pensado para buscar texto normal y evitar configuraciones confusas.",
                    en: "No. It is designed for plain-text search to avoid confusing settings.",
                    hi: "\u0928\u0939\u0940\u0902, \u0907\u0938\u0947 \u092D\u094D\u0930\u092E\u093F\u0924 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0940 \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u0938\u0947 \u092C\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u093E\u0926\u0947-\u092A\u093E\u0920 \u0916\u094B\u091C \u0915\u0947 \u0932\u093F\u090F \u0921\u093F\u091C\u093C\u093E\u0907\u0928 \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948\u0964"
                }
            }
        ]
    },
    "simple-cron-generator": {
        intro: {
            es: "Genera expresiones cron sencillas o pega una expresion cron de 5, 6 o 7 partes para entender que significa.",
            en: "Generate simple cron expressions or paste a 5-, 6-, or 7-part cron expression to understand what it means.",
            hi: "\u0907\u0938\u0915\u093E \u092E\u0924\u0932\u092C \u0938\u092E\u091D\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u0930\u0932 \u0915\u094D\u0930\u0949\u0928 \u090F\u0915\u094D\u0938\u092A\u094D\u0930\u0947\u0936\u0928 \u092C\u0928\u093E\u090F\u0902 \u092F\u093E 5, 6 \u092F\u093E 7-\u092D\u093E\u0917 \u0935\u093E\u0932\u093E \u0915\u094D\u0930\u0949\u0928 \u090F\u0915\u094D\u0938\u092A\u094D\u0930\u0947\u0936\u0928 \u091A\u093F\u092A\u0915\u093E\u090F\u0901\u0964"
        },
        sections: [
            {
                title: { es: "Sin sintaxis dificil", en: "No hard syntax", hi: "\u0915\u094B\u0908 \u0915\u0920\u093F\u0928 \u0935\u093E\u0915\u094D\u092F\u0935\u093F\u0928\u094D\u092F\u093E\u0938 \u0928\u0939\u0940\u0902" },
                body: [
                    {
                        es: "Elige si quieres una tarea cada ciertos minutos, cada hora, diaria, semanal o mensual y la herramienta arma el cron.",
                        en: "Choose whether you want a task every few minutes, hourly, daily, weekly, or monthly, and the tool builds the cron.",
                        hi: "\u091A\u0941\u0928\u0947\u0902 \u0915\u093F \u0915\u094D\u092F\u093E \u0906\u092A \u0939\u0930 \u0915\u0941\u091B \u092E\u093F\u0928\u091F\u094B\u0902 \u092E\u0947\u0902 \u090F\u0915 \u0915\u093E\u0930\u094D\u092F \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902, \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E, \u0926\u0948\u0928\u093F\u0915, \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u092F\u093E \u092E\u093E\u0938\u093F\u0915, \u0914\u0930 \u091F\u0942\u0932 \u0915\u094D\u0930\u0949\u0928 \u092C\u0928\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "También puedes pegar una expresión cron estándar, con segundos o Quartz para ver una explicación simple.",
                        en: "You can also paste a standard, seconds-based, or Quartz cron expression to see a simple explanation.",
                        hi: "\u0906\u092A \u0938\u094D\u091F\u0948\u0902\u0921\u0930\u094D\u0921, \u0938\u0947\u0915\u0902\u0921 \u0935\u093E\u0932\u093E \u092F\u093E Quartz \u0915\u094D\u0930\u0949\u0928 \u091A\u093F\u092A\u0915\u093E\u0915\u0930 \u0938\u0930\u0932 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0926\u0947\u0916 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Antes de usarlo", en: "Before using it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947" },
                body: [
                    {
                        es: "El cron generado usa el formato clasico de cinco campos: minuto, hora, dia, mes y dia de semana.",
                        en: "The generated cron uses the classic five-field format: minute, hour, day, month, and weekday.",
                        hi: "\u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u094D\u0930\u0949\u0928 \u0915\u094D\u0932\u093E\u0938\u093F\u0915 \u092A\u093E\u0902\u091A-\u092B\u093C\u0940\u0932\u094D\u0921 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u093E \u0939\u0948: \u092E\u093F\u0928\u091F, \u0918\u0902\u091F\u093E, \u0926\u093F\u0928, \u092E\u0939\u0940\u0928\u093E \u0914\u0930 \u0915\u093E\u0930\u094D\u092F\u0926\u093F\u0935\u0938\u0964"
                    },
                    {
                        es: "Revisa la zona horaria y el formato exacto de tu proveedor antes de programar una tarea real.",
                        en: "Check your provider's timezone and exact format before scheduling a real task.",
                        hi: "\u0915\u093F\u0938\u0940 \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0915\u093E\u0930\u094D\u092F \u0915\u094B \u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0905\u092A\u0928\u0947 \u092A\u094D\u0930\u0926\u093E\u0924\u093E \u0915\u0947 \u0938\u092E\u092F\u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u0914\u0930 \u0938\u091F\u0940\u0915 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: { es: "Sirve para cualquier sistema?", en: "Does it work for every system?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u0939\u0930 \u0938\u093F\u0938\u094D\u091F\u092E \u0915\u0947 \u0932\u093F\u090F \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "Sirve como base para cron de 5 campos y también puede leer formatos con segundos o Quartz. Revisa siempre el formato que pide tu proveedor.",
                    en: "It works as a base for 5-field cron and can also read formats with seconds or Quartz. Always review the format your provider requires.",
                    hi: "\u092F\u0939 5-\u092B\u093C\u0940\u0932\u094D\u0921 \u0915\u094D\u0930\u0949\u0928 \u0915\u0947 \u0932\u093F\u090F \u0906\u0927\u093E\u0930 \u0939\u0948 \u0914\u0930 \u0938\u0947\u0915\u0902\u0921 \u092F\u093E Quartz \u092B\u0949\u0930\u094D\u092E\u0947\u091F \u092D\u0940 \u092A\u0922\u093C \u0938\u0915\u0924\u093E \u0939\u0948\u0964 \u0939\u092E\u0947\u0936\u093E \u0905\u092A\u0928\u0947 \u092A\u094D\u0930\u0926\u093E\u0924\u093E \u0915\u093E \u092B\u0949\u0930\u094D\u092E\u0947\u091F \u091C\u093E\u0901\u091A\u0947\u0902\u0964"
                }
            },
            {
                question: { es: "Puede explicar un cron existente?", en: "Can it explain an existing cron?", hi: "\u0915\u094D\u092F\u093E \u092F\u0939 \u092E\u094C\u091C\u0942\u0926\u093E \u0915\u094D\u0930\u0949\u0928 \u0915\u0940 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948?" },
                answer: {
                    es: "Sí. Elige explicar cron y pega una expresión de 5, 6 o 7 partes, incluyendo ejemplos con ? o segundos.",
                    en: "Yes. Choose explain cron and paste a 5-, 6-, or 7-part expression, including examples with ? or seconds.",
                    hi: "\u0939\u093E\u0901\u0964 \u0915\u094D\u0930\u0949\u0928 \u0938\u092E\u091D\u093E\u090F\u0901 \u091A\u0941\u0928\u0947\u0902 \u0914\u0930 ? \u092F\u093E \u0938\u0947\u0915\u0902\u0921 \u0935\u093E\u0932\u0947 5, 6 \u092F\u093E 7-\u092D\u093E\u0917 \u090F\u0915\u094D\u0938\u092A\u094D\u0930\u0947\u0936\u0928 \u091A\u093F\u092A\u0915\u093E\u090F\u0901\u0964"
                }
            }
        ]
    },
    "resignation-letter-generator": {
        intro: {
            es: "Este generador de carta de renuncia crea un borrador editable para comunicar una salida laboral de forma clara y profesional.",
            en: "This resignation letter generator creates an editable draft to communicate a job departure clearly and professionally.",
            hi: "\u092F\u0939 \u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u091C\u0928\u0930\u0947\u091F\u0930 \u0928\u094C\u0915\u0930\u0940 \u091B\u094B\u0921\u093C\u0928\u0947 \u0915\u0940 \u0938\u0942\u091A\u0928\u093E \u0915\u094B \u0938\u094D\u092A\u0937\u094D\u091F \u0914\u0930 \u092A\u0947\u0936\u0947\u0935\u0930 \u0922\u0902\u0917 \u0938\u0947 \u0926\u0947\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u0902\u092A\u093E\u0926\u0928 \u092F\u094B\u0917\u094D\u092F \u0921\u094D\u0930\u093E\u092B\u094D\u091F \u092C\u0928\u093E\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Qué genera", en: "What it generates", hi: "\u092F\u0939 \u0915\u094D\u092F\u093E \u092C\u0928\u093E\u0924\u093E \u0939\u0948" },
                body: [
                    {
                        es: "Crea una carta con fecha, empresa, cargo, último día de trabajo, destinatario opcional, motivo opcional y cierre.",
                        en: "It creates a letter with date, company, role, last working day, optional recipient, optional reason, and closing.",
                        hi: "\u092F\u0939 \u0924\u093F\u0925\u093F, \u0915\u0902\u092A\u0928\u0940, \u092A\u0926, \u0905\u0902\u0924\u093F\u092E \u0915\u093E\u0930\u094D\u092F \u0926\u093F\u0935\u0938, \u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u092A\u094D\u0930\u093E\u092A\u094D\u0924\u0915\u0930\u094D\u0924\u093E, \u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0915\u093E\u0930\u0923 \u0914\u0930 \u0938\u092E\u093E\u092A\u0928 \u0915\u0947 \u0938\u093E\u0925 \u092A\u0924\u094D\u0930 \u092C\u0928\u093E\u0924\u093E \u0939\u0948\u0964"
                    },
                    {
                        es: "Puedes elegir un tono formal, breve o agradecido y editar el texto final antes de copiarlo o descargarlo.",
                        en: "You can choose a formal, brief, or grateful tone and edit the final text before copying or downloading it.",
                        hi: "\u0906\u092A \u0914\u092A\u091A\u093E\u0930\u093F\u0915, \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u092F\u093E \u0906\u092D\u093E\u0930\u0940 \u0936\u0948\u0932\u0940 \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0915\u0949\u092A\u0940 \u092F\u093E \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0905\u0902\u0924\u093F\u092E \u092A\u093E\u0920 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    }
                ]
            },
            {
                title: { es: "Cuándo usarla", en: "When to use it", hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u092C \u0915\u0930\u0947\u0902" },
                body: [
                    {
                        es: "Úsala cuando necesitas un punto de partida para informar una renuncia por escrito sin empezar desde cero.",
                        en: "Use it when you need a starting point to submit a written resignation without starting from scratch.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0924\u092C \u0915\u0930\u0947\u0902 \u091C\u092C \u0906\u092A\u0915\u094B \u0936\u0942\u0928\u094D\u092F \u0938\u0947 \u0936\u0941\u0930\u0942 \u0915\u093F\u090F \u092C\u093F\u0928\u093E \u0932\u093F\u0916\u093F\u0924 \u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u0926\u0947\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u0927\u093E\u0930 \u091A\u093E\u0939\u093F\u090F\u0964"
                    },
                    {
                        es: "El resultado es una plantilla práctica, no una revisión legal. Ajusta nombres, fechas y condiciones según tu caso.",
                        en: "The result is a practical template, not a legal review. Adjust names, dates, and conditions for your case.",
                        hi: "\u092A\u0930\u093F\u0923\u093E\u092E \u090F\u0915 \u0935\u094D\u092F\u093E\u0935\u0939\u093E\u0930\u093F\u0915 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u0939\u0948, \u0915\u093E\u0928\u0942\u0928\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0928\u0939\u0940\u0902\u0964 \u0905\u092A\u0928\u0947 \u092E\u093E\u092E\u0932\u0947 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0928\u093E\u092E, \u0924\u093F\u0925\u093F\u092F\u093E\u0901 \u0914\u0930 \u0936\u0930\u094D\u0924\u0947\u0902 \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Hay un formato único de carta de renuncia?",
                    en: "Is there one universal resignation letter format?",
                    hi: "\u0915\u094D\u092F\u093E \u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u0915\u093E \u090F\u0915 \u0939\u0940 \u0938\u093E\u0930\u094D\u0935\u092D\u094C\u092E \u092B\u0949\u0930\u094D\u092E\u0948\u091F \u0939\u0948?"
                },
                answer: {
                    es: "No hay un formato global único. La mayoría incluye fecha, destinatario, declaración de renuncia, último día y firma.",
                    en: "There is no single global format. Most letters include date, recipient, resignation statement, last working day, and signature.",
                    hi: "\u090F\u0915 \u0939\u0940 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u092B\u0949\u0930\u094D\u092E\u0948\u091F \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0905\u0927\u093F\u0915\u093E\u0902\u0936 \u092A\u0924\u094D\u0930\u094B\u0902 \u092E\u0947\u0902 \u0924\u093F\u0925\u093F, \u092A\u094D\u0930\u093E\u092A\u094D\u0924\u0915\u0930\u094D\u0924\u093E, \u0924\u094D\u092F\u093E\u0917 \u0915\u0940 \u0918\u094B\u0937\u0923\u093E, \u0905\u0902\u0924\u093F\u092E \u0915\u093E\u0930\u094D\u092F \u0926\u093F\u0935\u0938 \u0914\u0930 \u0939\u0938\u094D\u0924\u093E\u0915\u094D\u0937\u0930 \u0936\u093E\u092E\u093F\u0932 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿La carta generada es válida legalmente?",
                    en: "Is the generated letter legally valid?",
                    hi: "\u0915\u094D\u092F\u093E \u092C\u0928\u093E\u092F\u093E \u0917\u092F\u093E \u092A\u0924\u094D\u0930 \u0915\u093E\u0928\u0942\u0928\u0940 \u0930\u0942\u092A \u0938\u0947 \u0935\u0948\u0927 \u0939\u0948?"
                },
                answer: {
                    es: "Es un borrador editable. La validez y los requisitos pueden cambiar por país, contrato, empresa o política interna.",
                    en: "It is an editable draft. Validity and requirements may vary by country, contract, company, or internal policy.",
                    hi: "\u092F\u0939 \u090F\u0915 \u0938\u0902\u092A\u093E\u0926\u0928 \u092F\u094B\u0917\u094D\u092F \u0921\u094D\u0930\u093E\u092B\u094D\u091F \u0939\u0948\u0964 \u0935\u0948\u0927\u0924\u093E \u0914\u0930 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E\u090F\u0901 \u0926\u0947\u0936, \u0905\u0928\u0941\u092C\u0902\u0927, \u0915\u0902\u092A\u0928\u0940 \u092F\u093E \u0906\u0902\u0924\u0930\u093F\u0915 \u0928\u0940\u0924\u093F \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u092C\u0926\u0932 \u0938\u0915\u0924\u0940 \u0939\u0948\u0964"
                }
            },
            {
                question: {
                    es: "¿Debo poner el motivo de mi renuncia?",
                    en: "Should I include the reason for resigning?",
                    hi: "\u0915\u094D\u092F\u093E \u092E\u0941\u091D\u0947 \u0924\u094D\u092F\u093E\u0917 \u0915\u093E \u0915\u093E\u0930\u0923 \u0932\u093F\u0916\u0928\u093E \u091A\u093E\u0939\u093F\u090F?"
                },
                answer: {
                    es: "Es opcional. Si lo usas, conviene mantenerlo corto, claro y profesional.",
                    en: "It is optional. If you include it, keep it short, clear, and professional.",
                    hi: "\u092F\u0939 \u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0939\u0948\u0964 \u0905\u0917\u0930 \u0906\u092A \u0907\u0938\u0947 \u0936\u093E\u092E\u093F\u0932 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0924\u094B \u0907\u0938\u0947 \u091B\u094B\u091F\u093E, \u0938\u094D\u092A\u0937\u094D\u091F \u0914\u0930 \u092A\u0947\u0936\u0947\u0935\u0930 \u0930\u0916\u0947\u0902\u0964"
                }
            }
        ]
    },
    "email-template-generator": {
        intro: {
            es: "Este creador de plantillas HTML de correo arma mensajes visuales para responder, solicitar, vender, agradecer o hacer seguimiento sin empezar desde cero.",
            en: "This HTML email template generator builds visual messages for replies, requests, sales, thank-yous, and follow-ups without starting from scratch.",
            hi: "\u092F\u0939 HTML \u0908\u092E\u0947\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u091C\u0928\u0930\u0947\u091F\u0930 \u091C\u0935\u093E\u092C, \u0905\u0928\u0941\u0930\u094B\u0927, \u0938\u0947\u0932\u094D\u0938, \u0927\u0928\u094D\u092F\u0935\u093E\u0926 \u0914\u0930 \u092B\u0949\u0932\u094B-\u0905\u092A \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u091C\u093C\u0941\u0905\u0932 \u0938\u0902\u0926\u0947\u0936 \u092C\u0928\u093E\u0924\u093E \u0939\u0948\u0964"
        },
        sections: [
            {
                title: { es: "Diseños HTML", en: "HTML layouts", hi: "HTML \u0921\u093F\u091C\u093C\u093E\u0907\u0928" },
                body: [
                    {
                        es: "Puedes elegir diseño, cabecera, cuerpo, botón y footer para crear una plantilla HTML con marca, colores y vista previa.",
                        en: "You can choose layout, header, body, button, and footer styles to create an HTML template with brand, colors, and preview.",
                        hi: "\u0906\u092A \u092C\u094D\u0930\u093E\u0902\u0921, \u0930\u0902\u0917 \u0914\u0930 \u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942 \u0915\u0947 \u0938\u093E\u0925 HTML \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0921\u093F\u091C\u093C\u093E\u0907\u0928, \u0939\u0947\u0921\u0930, \u092C\u0949\u0921\u0940, \u092C\u091F\u0928 \u0914\u0930 \u092B\u0941\u091F\u0930 \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                    },
                    {
                        es: "La vista previa puede actualizarse automáticamente mientras cambias campos o quedar fija si desactivas esa opción.",
                        en: "The preview can update automatically while you change fields or stay fixed if you turn that option off.",
                        hi: "\u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942 \u092B\u0940\u0932\u094D\u0921 \u092C\u0926\u0932\u0924\u0947 \u0938\u092E\u092F \u0905\u092A\u0928\u0947 \u0906\u092A \u0905\u092A\u0921\u0947\u091F \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948 \u092F\u093E \u0906\u092A \u091A\u093E\u0939\u0947\u0902 \u0924\u094B \u0938\u094D\u0925\u093F\u0930 \u0930\u0939 \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
                    }
                ]
            },
            {
                title: { es: "Casos de uso", en: "Use cases", hi: "\u0909\u092A\u092F\u094B\u0917 \u0915\u0947 \u092E\u093E\u092E\u0932\u0947" },
                body: [
                    {
                        es: "Sirve para solicitudes, seguimientos, propuestas, recordatorios, agradecimientos y disculpas con tono formal, amable o directo.",
                        en: "Use it for requests, follow-ups, proposals, reminders, thank-yous, and apologies in a formal, friendly, or direct tone.",
                        hi: "\u0907\u0938\u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0905\u0928\u0941\u0930\u094B\u0927, \u092B\u0949\u0932\u094B-\u0905\u092A, \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935, \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930, \u0927\u0928\u094D\u092F\u0935\u093E\u0926 \u0914\u0930 \u0915\u094D\u0937\u092E\u093E \u0915\u0947 \u0932\u093F\u090F \u0914\u092A\u091A\u093E\u0930\u093F\u0915, \u092E\u093F\u0924\u094D\u0930\u0935\u0924 \u092F\u093E \u0938\u0940\u0927\u0947 \u091F\u094B\u0928 \u092E\u0947\u0902 \u0915\u0930\u0947\u0902\u0964"
                    },
                    {
                        es: "Antes de enviarlo, revisa nombres, enlaces, condiciones comerciales y cualquier dato sensible.",
                        en: "Before sending it, review names, links, business terms, and any sensitive data.",
                        hi: "\u092D\u0947\u091C\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0928\u093E\u092E, \u0932\u093F\u0902\u0915, \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0936\u0930\u094D\u0924\u0947\u0902 \u0914\u0930 \u0915\u093F\u0938\u0940 \u092D\u0940 \u0938\u0902\u0935\u0947\u0926\u0928\u0936\u0940\u0932 \u0921\u0947\u091F\u093E \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0930\u0947\u0902\u0964"
                    }
                ]
            }
        ],
        faqs: [
            {
                question: {
                    es: "¿Puedo generar correos HTML?",
                    en: "Can I generate HTML emails?",
                    hi: "\u0915\u094D\u092F\u093E \u092E\u0948\u0902 HTML \u0908\u092E\u0947\u0932 \u092C\u0928\u093E \u0938\u0915\u0924\u093E \u0939\u0942\u0901?"
                },
                answer: {
                    es: "S\u00ED. Puedes agregar marca, logo, color, bot\u00F3n, cabecera, footer y vista previa antes de copiar el c\u00F3digo.",
                    en: "Yes. You can add brand, logo, color, button, header, footer, and preview before copying the code.",
                    hi: "\u0939\u093E\u0901\u0964 \u0915\u094B\u0921 \u0915\u0949\u092A\u0940 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u092C\u094D\u0930\u093E\u0902\u0921, \u0932\u094B\u0917\u094B, \u0930\u0902\u0917, \u092C\u091F\u0928, \u0939\u0947\u0921\u0930, \u092B\u0941\u091F\u0930 \u0914\u0930 \u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942 \u091C\u094B\u0921\u093C \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿El correo se envía automáticamente?",
                    en: "Is the email sent automatically?",
                    hi: "\u0915\u094D\u092F\u093E \u0908\u092E\u0947\u0932 \u0905\u092A\u0928\u0947 \u0906\u092A \u092D\u0947\u091C\u093E \u091C\u093E\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "No. La herramienta solo genera el HTML para que lo revises, copies, descargues y pegues en tu editor o plataforma de correo.",
                    en: "No. The tool only generates the HTML so you can review, copy, download, and paste it into your email editor or platform.",
                    hi: "\u0928\u0939\u0940\u0902\u0964 \u091F\u0942\u0932 \u0938\u093F\u0930\u094D\u092B HTML \u092C\u0928\u093E\u0924\u093E \u0939\u0948 \u0924\u093E\u0915\u093F \u0906\u092A \u0909\u0938\u0947 \u091C\u093E\u0902\u091A\u0947\u0902, \u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902, \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0905\u092A\u0928\u0947 \u0908\u092E\u0947\u0932 \u090F\u0921\u093F\u091F\u0930 \u092E\u0947\u0902 \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902\u0964"
                }
            },
            {
                question: {
                    es: "¿El HTML funciona igual en todos los clientes de correo?",
                    en: "Does the HTML work the same in every email client?",
                    hi: "\u0915\u094D\u092F\u093E HTML \u0939\u0930 \u0908\u092E\u0947\u0932 \u0915\u094D\u0932\u093E\u0907\u0902\u091F \u092E\u0947\u0902 \u090F\u0915 \u091C\u0948\u0938\u093E \u091A\u0932\u0924\u093E \u0939\u0948?"
                },
                answer: {
                    es: "No siempre. Usamos estilos inline para mejorar compatibilidad, pero conviene probar el correo en el cliente real antes de enviarlo.",
                    en: "Not always. We use inline styles for better compatibility, but you should test the email in the real client before sending.",
                    hi: "\u0939\u092E\u0947\u0936\u093E \u0928\u0939\u0940\u0902\u0964 \u092C\u0947\u0939\u0924\u0930 \u0938\u0902\u0917\u0924\u0924\u093E \u0915\u0947 \u0932\u093F\u090F \u0907\u0928\u0932\u093E\u0907\u0928 \u0938\u094D\u091F\u093E\u0907\u0932 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0932\u0947\u0915\u093F\u0928 \u092D\u0947\u091C\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0930\u093F\u092F\u0932 \u0915\u094D\u0932\u093E\u0907\u0902\u091F \u092E\u0947\u0902 \u091F\u0947\u0938\u094D\u091F \u0915\u0930\u0928\u093E \u0905\u091A\u094D\u091B\u093E \u0939\u0948\u0964"
                }
            }
        ]
    }
};
