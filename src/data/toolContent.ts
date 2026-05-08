import type { LocalizedText } from "../i18n";

export type ToolContent = {
  intro: LocalizedText;
  sections: Array<{
    title: LocalizedText;
    body: LocalizedText[];
  }>;
  faqs: Array<{
    question: LocalizedText;
    answer: LocalizedText;
  }>;
};

export const toolContentById: Record<string, ToolContent> = {
  "net-salary-colombia": {
    intro: {
      es: "Esta calculadora de salario neto Colombia ayuda a estimar cuánto dinero recibirías realmente después de los descuentos básicos de nómina.",
      en: "This Colombia net salary calculator helps estimate how much money you would actually receive after basic payroll deductions."
    },
    sections: [
      {
        title: { es: "Qué calcula", en: "What it calculates" },
        body: [
          {
            es: "Parte del salario mensual bruto y descuenta los aportes del empleado a salud y pensión para estimar el sueldo neto mensual y quincenal.",
            en: "It starts from the gross monthly salary and subtracts employee health and pension contributions to estimate monthly and biweekly take-home pay."
          },
          {
            es: "También puede mostrar auxilio de transporte, Fondo de Solidaridad Pensional y deducciones adicionales cuando aplican. No reemplaza el desprendible oficial de nómina.",
            en: "It can also show transport allowance, the solidarity pension fund, and extra deductions when they apply. It does not replace an official payslip."
          }
        ]
      },
      {
        title: { es: "Cómo usarla", en: "How to use it" },
        body: [
          {
            es: "Ingresa tu salario mensual bruto, el año de reglas y cualquier descuento de nómina adicional que quieras considerar para calcular el salario neto.",
            en: "Enter your gross monthly salary, the rule year, and any extra payroll deductions you want to include when calculating net salary."
          },
          {
            es: "Activa el auxilio de transporte o el Fondo de Solidaridad solo si quieres ver ese detalle en el resultado.",
            en: "Enable transport allowance or the solidarity fund only if you want to see that detail in the result."
          }
        ]
      }
    ],
    faqs: [
      {
        question: {
          es: "¿Cómo calcular mi salario neto en Colombia?",
          en: "How do I calculate my net salary in Colombia?"
        },
        answer: {
          es: "Escribe tu salario mensual bruto y el año de reglas. La calculadora descuenta salud, pensión y otros conceptos aplicables para estimar el valor neto mensual y quincenal.",
          en: "Enter your gross monthly salary and rule year. The calculator subtracts health, pension, and applicable items to estimate monthly and biweekly take-home pay."
        }
      },
      {
        question: {
          es: "¿El auxilio de transporte siempre aplica?",
          en: "Does the transport allowance always apply?"
        },
        answer: {
          es: "No. Depende del salario y de los límites legales del año seleccionado. La herramienta valida si el salario cumple el límite.",
          en: "No. It depends on the salary and the legal limits of the selected year. The tool checks whether the salary meets that threshold."
        }
      },
      {
        question: {
          es: "¿Este cálculo incluye retención en la fuente?",
          en: "Does this calculation include withholding tax?"
        },
        answer: {
          es: "No. La retención, pagos no salariales, acuerdos especiales y otros conceptos pueden cambiar el valor final.",
          en: "No. Withholding tax, non-salary payments, special agreements, and other concepts may change the final amount."
        }
      }
    ]
  },
  "hourly-salary": {
    intro: {
      es: "Esta calculadora de salario por hora convierte un salario mensual en cuánto ganas por hora usando la jornada legal vigente en Colombia o una jornada personalizada.",
      en: "This hourly salary calculator converts a monthly salary into how much you earn per hour using Colombia's current legal workweek or a custom schedule."
    },
    sections: [
      {
        title: { es: "Qué calcula", en: "What it calculates" },
        body: [
          {
            es: "Transforma un salario mensual en valor por hora y por día laboral para ayudarte a responder cuánto gano por hora y comparar ofertas o cambios de jornada.",
            en: "It turns a monthly salary into hourly and daily pay so you can answer how much you earn per hour and compare offers or schedule changes."
          },
          {
            es: "Puedes calcular el valor bruto por hora o el valor neto estimado después de salud, pensión y Fondo de Solidaridad Pensional cuando aplica.",
            en: "You can calculate the gross hourly value or the estimated net value after health, pension, and solidarity fund deductions when they apply."
          }
        ]
      },
      {
        title: { es: "Cómo usarla", en: "How to use it" },
        body: [
          {
            es: "Ingresa el salario mensual, elige si quieres ver el resultado bruto o neto y revisa las horas semanales legales que aparecen por defecto para Colombia.",
            en: "Enter the monthly salary, choose whether you want the gross or net result, and review the legal weekly hours shown by default for Colombia."
          },
          {
            es: "Si tu horario real es distinto al legal, usa el lápiz para editar las horas semanales y recalcular con tu jornada personalizada.",
            en: "If your real schedule differs from the legal one, use the pencil to edit the weekly hours and recalculate with your custom schedule."
          }
        ]
      }
    ],
    faqs: [
      {
        question: {
          es: "¿Cómo saber cuánto gano por hora?",
          en: "How do I know how much I earn per hour?"
        },
        answer: {
          es: "Ingresa tu salario mensual y las horas semanales de trabajo. La herramienta divide el salario entre las horas estimadas del mes para mostrar el valor por hora.",
          en: "Enter your monthly salary and weekly work hours. The tool divides salary by estimated monthly hours to show hourly pay."
        }
      },
      {
        question: {
          es: "¿Se puede calcular el valor hora dividiendo el salario mensual entre 240?",
          en: "Can I calculate hourly pay by dividing monthly salary by 240?"
        },
        answer: {
          es: "Sí, es una referencia común cuando se usa una jornada mensual de 240 horas. La herramienta también permite ajustar las horas semanales para reflejar la jornada legal vigente o tu horario real.",
          en: "Yes, it is a common reference when using a 240-hour monthly schedule. The tool also lets you adjust weekly hours to match the current legal workweek or your real schedule."
        }
      },
      {
        question: {
          es: "¿La herramienta usa las horas legales de Colombia?",
          en: "Does the tool use Colombia's legal weekly hours?"
        },
        answer: {
          es: "Sí. Por defecto toma la jornada legal vigente en Colombia según la fecha actual. Aun así puedes editarla si tu contrato o acuerdo usa otra cantidad de horas.",
          en: "Yes. By default it uses Colombia's current legal workweek based on today's date. You can still edit it if your contract uses a different number of hours."
        }
      },
      {
        question: {
          es: "¿El cálculo neto incluye todos los descuentos posibles?",
          en: "Does the net calculation include every possible deduction?"
        },
        answer: {
          es: "No. Estima salud, pensión y Fondo de Solidaridad Pensional cuando aplica. No incluye retención en la fuente, horas extra, recargos, auxilio de transporte ni descuentos especiales de nómina.",
          en: "No. It estimates health, pension, and the solidarity pension fund when applicable. It does not include withholding tax, overtime, surcharges, transport allowance, or special payroll deductions."
        }
      }
    ]
  },
  "employee-salary-equivalent": {
    intro: {
      es: "Esta calculadora ayuda a convertir lo que cobras por hora como independiente en un sueldo equivalente como empleado.",
      en: "This calculator helps convert what you charge per hour as an independent worker into an equivalent employee salary."
    },
    sections: [
      {
        title: { es: "Qué calcula", en: "What it calculates" },
        body: [
          {
            es: "Toma tu tarifa por hora y las horas que trabajas por semana para proyectar un ingreso semanal y un sueldo equivalente quincenal, mensual y anual.",
            en: "It takes your hourly rate and weekly hours to project a weekly income and an equivalent biweekly, monthly, and annual employee salary."
          },
          {
            es: "También estima el neto mensual y quincenal como empleado dependiente en Colombia, descontando salud, pensión y Fondo de Solidaridad Pensional cuando aplica.",
            en: "It also estimates monthly and biweekly net income as a dependent employee in Colombia after health, pension, and solidarity fund deductions when they apply."
          }
        ]
      },
      {
        title: { es: "Cómo usarla", en: "How to use it" },
        body: [
          {
            es: "Ingresa cuánto cobras por hora y cuántas horas trabajas por semana con ese ritmo real de trabajo.",
            en: "Enter how much you charge per hour and how many hours you truly work per week."
          },
          {
            es: "La herramienta te mostrará el equivalente como sueldo de empleado para que compares mejor ofertas, contratos o expectativas de ingreso.",
            en: "The tool shows the equivalent employee salary so you can compare offers, contracts, or income expectations more easily."
          }
        ]
      }
    ],
    faqs: [
      {
        question: {
          es: "¿Esto calcula exactamente lo que me pagarían como empleado?",
          en: "Does this calculate exactly what I would earn as an employee?"
        },
        answer: {
          es: "No. Es una equivalencia estimada. Sirve para comparar ingresos, pero no incluye retención en la fuente, recargos, auxilios, horas extra ni condiciones especiales del contrato.",
          en: "No. It is an estimated equivalence. It helps you compare income, but it does not include withholding tax, surcharges, allowances, overtime, or special contract conditions."
        }
      },
      {
        question: {
          es: "¿Por qué muestra bruto y neto?",
          en: "Why does it show gross and net?"
        },
        answer: {
          es: "Porque como empleado normalmente existe un salario bruto y luego descuentos de nómina. El neto te ayuda a entender mejor cuánto podría quedarte realmente.",
          en: "Because employees usually have a gross salary and then payroll deductions. The net amount helps you understand what could actually remain."
        }
      }
    ]
  },
  "employment-settlement-colombia": {
    intro: {
      es: "Esta calculadora de liquidación laboral en Colombia estima cuánto podría corresponderte cuando termina una relación de trabajo o quieres saber a cuánto equivale la liquidación.",
      en: "This Colombia employment settlement calculator estimates what may be owed when a work relationship ends."
    },
    sections: [
      {
        title: { es: "Qué incluye", en: "What it includes" },
        body: [
          {
            es: "Calcula cesantías, intereses de cesantías, prima de servicios, vacaciones pendientes, salario pendiente y otros pagos o deducciones que ingreses.",
            en: "It calculates severance, severance interest, service bonus, unused vacation, pending salary, and any extra earnings or deductions you enter."
          },
          {
            es: "También sirve para preguntas comunes como calcular liquidación laboral, liquidación 2025, liquidación 2026 o cuánto equivale la liquidación al salir de un empleo.",
            en: "It also helps with common questions such as calculating an employment settlement, estimating a past-year settlement, or understanding what a final payout may represent."
          },
          {
            es: "Cuando eliges terminación sin justa causa, también puede estimar una indemnización según el tipo de contrato.",
            en: "When you choose termination without just cause, it can also estimate dismissal compensation based on the contract type."
          }
        ]
      },
      {
        title: { es: "Datos importantes", en: "Important inputs" },
        body: [
          {
            es: "Usa la fecha de inicio, fecha de finalización, salario base, tipo de contrato y motivo de terminación.",
            en: "It uses the employment start date, end date, base salary, contract type, and termination reason."
          },
          {
            es: "El cálculo puede variar por salario variable, pactos internos, sanciones, retenciones, pagos pendientes o interpretación legal del caso.",
            en: "The estimate may vary because of variable salary, internal agreements, sanctions, withholdings, pending payments, or legal interpretation of the case."
          }
        ]
      },
      {
        title: { es: "Cómo leer el resultado", en: "How to read the result" },
        body: [
          {
            es: "El total separa la liquidación ordinaria de una posible indemnización. Esto ayuda a entender qué parte corresponde a prestaciones y qué parte nace por terminación sin justa causa.",
            en: "The total separates the ordinary settlement from possible dismissal compensation. This helps distinguish benefits owed from compensation tied to termination without just cause."
          },
          {
            es: "Si tu contrato tiene salario variable, comisiones, pagos no salariales o acuerdos especiales, usa el resultado como referencia y revisa tu caso con soporte laboral.",
            en: "If your contract includes variable pay, commissions, non-salary payments, or special agreements, use the result as a reference and review your specific case with labor support."
          }
        ]
      }
    ],
    faqs: [
      {
        question: {
          es: "¿A cuánto equivale la liquidación laboral?",
          en: "What does an employment settlement include?"
        },
        answer: {
          es: "Depende de salario, fechas, prestaciones pendientes, vacaciones, motivo de terminación y si aplica indemnización. La calculadora separa esos conceptos para darte una estimación.",
          en: "It depends on salary, dates, pending benefits, vacation, termination reason, and whether dismissal compensation applies. The calculator separates those items to estimate the payout."
        }
      },
      {
        question: {
          es: "¿La fecha de inicio siempre se usa?",
          en: "Is the start date always used?"
        },
        answer: {
          es: "Sí, sirve para estimar los días de relación laboral y, especialmente, para la indemnización cuando hay despido sin justa causa.",
          en: "Yes. It helps estimate the duration of the employment relationship and, especially, dismissal compensation when there is termination without just cause."
        }
      },
      {
        question: {
          es: "¿La liquidación es el valor exacto que deben pagarme?",
          en: "Is the settlement the exact amount I should be paid?"
        },
        answer: {
          es: "No necesariamente. Es una estimación con reglas generales y puede cambiar según documentos, contrato y condiciones particulares.",
          en: "Not necessarily. It is an estimate based on general rules and may change depending on documents, the contract, and specific conditions."
        }
      },
      {
        question: {
          es: "¿Puedo calcular una liquidación de 2025?",
          en: "Can I calculate a 2025 employment settlement?"
        },
        answer: {
          es: "Sí, puedes elegir el año de reglas disponible. La herramienta usa ese año para valores legales como salario mínimo y auxilio de transporte cuando aplican.",
          en: "Yes, you can choose an available rule year. The tool uses that year for legal values such as minimum wage and transport allowance when they apply."
        }
      }
    ]
  },
  "credit-interest": {
    intro: {
      es: "Esta calculadora estima cuánto pagarías en intereses por un crédito antes de tomar una decisión de endeudamiento.",
      en: "This calculator estimates how much you would pay in interest on a loan before taking on debt."
    },
    sections: [
      {
        title: { es: "Qué calcula", en: "What it calculates" },
        body: [
          {
            es: "Usa el monto del préstamo, la tasa anual, el plazo en meses y el tipo de interés para estimar intereses totales y total a pagar.",
            en: "It uses the loan amount, annual rate, term in months, and interest type to estimate total interest and the total amount paid."
          },
          {
            es: "Es útil para comparar escenarios simples antes de pedir un crédito, aceptar una oferta o revisar si una tasa te conviene.",
            en: "It is useful for comparing simple scenarios before requesting a loan, accepting an offer, or checking whether a rate makes sense."
          }
        ]
      },
      {
        title: { es: "Qué no calcula", en: "What it does not calculate" },
        body: [
          {
            es: "No calcula una cuota fija amortizada. Para eso usa la calculadora de cuota de préstamo.",
            en: "It does not calculate a fixed amortized payment. For that, use the loan payment calculator."
          },
          {
            es: "Tampoco incluye seguros, comisiones, impuestos, cargos administrativos ni cambios de tasa.",
            en: "It also does not include insurance, fees, taxes, administrative charges, or rate changes."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿La tasa es anual o mensual?", en: "Is the rate annual or monthly?" },
        answer: {
          es: "El campo principal usa tasa anual. La herramienta la convierte según el tipo de interés elegido.",
          en: "The main field uses an annual rate. The tool converts it according to the selected interest type."
        }
      },
      {
        question: {
          es: "¿Interés simple y compuesto dan lo mismo?",
          en: "Do simple and compound interest produce the same result?"
        },
        answer: {
          es: "No. En el simple los intereses no generan nuevos intereses. En el compuesto, los intereses se acumulan según la capitalización.",
          en: "No. With simple interest, interest does not generate additional interest. With compound interest, interest accumulates according to the compounding frequency."
        }
      },
      {
        question: {
          es: "¿Esta calculadora me dice la cuota mensual?",
          en: "Does this calculator show the monthly payment?"
        },
        answer: {
          es: "No. Esta calcula intereses totales. Para una cuota fija mensual usa la calculadora de cuota de préstamo.",
          en: "No. This one calculates total interest. For a fixed monthly payment, use the loan payment calculator."
        }
      }
    ]
  },
  "loan-payment": {
    intro: {
      es: "Esta calculadora estima la cuota mensual de un préstamo con pagos fijos.",
      en: "This calculator estimates the monthly payment of a fixed-payment loan."
    },
    sections: [
      {
        title: { es: "Para qué sirve", en: "What it is for" },
        body: [
          {
            es: "Te ayuda a saber cuánto podrías pagar cada mes según el monto solicitado, la tasa y el plazo.",
            en: "It helps you understand how much you might pay each month based on the requested amount, rate, and term."
          },
          {
            es: "También muestra el total de intereses y el valor total estimado que terminarías pagando.",
            en: "It also shows total interest and the estimated total amount you would end up paying."
          }
        ]
      },
      {
        title: { es: "Cómo interpretarla", en: "How to interpret it" },
        body: [
          {
            es: "En un préstamo de cuota fija, cada cuota combina capital e intereses. Al inicio pagas más interés y con el tiempo más capital.",
            en: "In a fixed-payment loan, each payment combines principal and interest. At the beginning you pay more interest, and over time more principal."
          },
          {
            es: "El valor real puede cambiar si el banco incluye seguros, comisiones, cargos administrativos o una tasa distinta.",
            en: "The real amount may change if the bank includes insurance, fees, administrative charges, or a different rate."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿La cuota siempre queda fija?", en: "Does the payment always stay fixed?" },
        answer: {
          es: "En créditos de cuota fija sí se mantiene estable bajo las condiciones iniciales. Puede cambiar si la tasa es variable o hay cargos externos.",
          en: "For fixed-payment loans, yes, it stays stable under the initial conditions. It may change if the rate is variable or if external charges apply."
        }
      },
      {
        question: { es: "¿Puedo usar tasa mensual?", en: "Can I use a monthly rate?" },
        answer: {
          es: "Sí. La herramienta permite elegir si la tasa ingresada es anual o mensual.",
          en: "Yes. The tool lets you choose whether the entered rate is annual or monthly."
        }
      }
    ]
  },
  "cop-usd": {
    intro: {
      es: "Convierte pesos colombianos a dólares o dólares a pesos usando una TRM de referencia.",
      en: "Convert Colombian pesos to US dollars or dollars to pesos using a reference exchange rate."
    },
    sections: [
      {
        title: { es: "Cuándo usarlo", en: "When to use it" },
        body: [
          {
            es: "Sirve para estimar compras internacionales, pagos, viajes, ahorros, facturas o valores expresados en dólares.",
            en: "Use it to estimate international purchases, payments, travel, savings, invoices, or values expressed in US dollars."
          },
          {
            es: "La conversión usa una tasa de referencia y evita redondeos agresivos para conservar precisión.",
            en: "The conversion uses a reference rate and avoids aggressive rounding so you keep more precision."
          }
        ]
      },
      {
        title: { es: "Ten en cuenta", en: "Keep in mind" },
        body: [
          {
            es: "Tu banco, tarjeta, plataforma de pago o casa de cambio puede aplicar otra tasa.",
            en: "Your bank, card, payment platform, or exchange house may apply a different rate."
          },
          {
            es: "También pueden existir comisiones, spreads, impuestos o cargos que no están incluidos en el cálculo.",
            en: "There may also be fees, spreads, taxes, or charges that are not included in the calculation."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿La TRM es igual a la tasa de mi banco?", en: "Is the reference rate the same as my bank's rate?" },
        answer: {
          es: "No siempre. La TRM es una referencia; cada entidad puede manejar una tasa propia.",
          en: "Not always. The reference rate is just that: a reference. Each institution can use its own rate."
        }
      },
      {
        question: { es: "¿Puedo convertir USD a COP?", en: "Can I convert USD to COP?" },
        answer: {
          es: "Sí. Cambia la dirección de conversión y escribe el monto en dólares.",
          en: "Yes. Change the conversion direction and enter the amount in US dollars."
        }
      }
    ]
  },
  "salary-increase": {
    intro: {
      es: "Calcula cómo queda un salario después de aplicar un aumento porcentual.",
      en: "Calculate what a salary looks like after applying a percentage raise."
    },
    sections: [
      {
        title: { es: "Qué calcula", en: "What it calculates" },
        body: [
          {
            es: "La herramienta toma el salario actual y el porcentaje de aumento para estimar el nuevo salario mensual.",
            en: "The tool takes the current salary and increase percentage to estimate the new monthly salary."
          },
          {
            es: "También muestra el valor exacto del aumento y la diferencia anual si ese aumento se mantiene durante doce meses.",
            en: "It also shows the exact increase amount and the annual difference if that raise stays in place for twelve months."
          }
        ]
      },
      {
        title: { es: "Cuándo usarla", en: "When to use it" },
        body: [
          {
            es: "Sirve para revisar propuestas de aumento salarial, comparar escenarios o entender cuánto representa un porcentaje sobre tu sueldo.",
            en: "Use it to review salary raise proposals, compare scenarios, or understand what a percentage means on your pay."
          },
          {
            es: "No calcula descuentos de nómina, impuestos, auxilios, bonificaciones ni reglas internas de la empresa.",
            en: "It does not calculate payroll deductions, taxes, allowances, bonuses, or company-specific rules."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Cómo calcular un aumento salarial?", en: "How do I calculate a salary increase?" },
        answer: {
          es: "Ingresa el salario actual y el porcentaje de aumento. La calculadora multiplica el salario por ese porcentaje y suma el resultado al salario actual.",
          en: "Enter the current salary and increase percentage. The calculator multiplies the salary by that percentage and adds the result to the current salary."
        }
      },
      {
        question: { es: "¿El resultado es salario neto?", en: "Is the result net salary?" },
        answer: {
          es: "No. Es una estimación simple del salario antes de descuentos. Nómina, impuestos o acuerdos internos pueden cambiar el valor final.",
          en: "No. It is a simple salary estimate before deductions. Payroll, taxes, or internal agreements may change the final amount."
        }
      }
    ]
  },
  "worked-hours": {
    intro: {
      es: "Esta calculadora de horas trabajadas suma jornadas por día, semana o periodo para saber cuánto tiempo trabajaste en total.",
      en: "This worked hours calculator adds daily, weekly, or period work entries so you can see the total time worked."
    },
    sections: [
      {
        title: { es: "Qué puedes calcular", en: "What you can calculate" },
        body: [
          {
            es: "Agrega una o varias jornadas con fecha, hora de inicio y hora de finalización para sumar horas trabajadas, horas laborales o turnos sin hacer cuentas manuales.",
            en: "Add one or more work entries with date, start time, and end time to add worked hours, labor hours, or shifts without manual math."
          },
          {
            es: "La herramienta suma los minutos y los presenta como horas totales, minutos totales y tiempo trabajado por cada jornada.",
            en: "The tool totals the minutes and shows total hours, total minutes, and worked time for each entry."
          }
        ]
      },
      {
        title: { es: "Para qué sirve", en: "What it is for" },
        body: [
          {
            es: "Es útil para calcular mis horas de trabajo, sumar horas trabajadas, preparar reportes, cobrar por hora, controlar tiempo y revisar jornadas laborales.",
            en: "It is useful for calculating my work hours, reports, hourly billing, personal time tracking, and work shift reviews."
          },
          {
            es: "No evalúa recargos, horas extra legales, festivos ni reglas laborales especiales.",
            en: "It does not evaluate surcharges, legal overtime, holidays, or special labor rules."
          }
        ]
      },
      {
        title: { es: "Ejemplo de uso", en: "Example use" },
        body: [
          {
            es: "Si trabajaste de 8:00 a. m. a 5:00 p. m., agrega esa jornada y la herramienta calcula las horas de trabajo del día.",
            en: "If you worked from 8:00 a.m. to 5:00 p.m., add that entry and the tool calculates the work hours for that day."
          },
          {
            es: "Si tienes varios días, crea una jornada por cada fecha para obtener el total acumulado.",
            en: "If you have several days, create one entry for each date to get the accumulated total."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Cómo sumar horas trabajadas?", en: "How do I add worked hours?" },
        answer: {
          es: "Crea una jornada por cada día o turno con hora de inicio y finalización. La calculadora suma todos los rangos y muestra el total acumulado.",
          en: "Create one entry for each day or shift with start and end time. The calculator adds all ranges and shows the accumulated total."
        }
      },
      {
        question: { es: "¿Puedo sumar varias jornadas?", en: "Can I add multiple work entries?" },
        answer: {
          es: "Sí. Agrega todos los rangos que necesites y la herramienta los suma.",
          en: "Yes. Add as many entries as you need and the tool will total them."
        }
      },
      {
        question: { es: "¿Calcula horas extra?", en: "Does it calculate overtime?" },
        answer: {
          es: "No. Solo suma tiempo trabajado; los recargos dependen de reglas laborales y acuerdos específicos.",
          en: "No. It only adds worked time; overtime surcharges depend on labor rules and specific agreements."
        }
      },
      {
        question: { es: "¿Cómo contar las horas de trabajo diarias?", en: "How do I count daily work hours?" },
        answer: {
          es: "Selecciona la fecha, escribe la hora de inicio y la hora de finalización. La calculadora resta esos tiempos y suma el resultado con las demás jornadas.",
          en: "Choose the date, enter the start time and end time. The calculator subtracts those times and adds the result to the other entries."
        }
      }
    ]
  },
  "freelance-rate": {
    intro: {
      es: "Calcula una tarifa freelance estimada a partir de tu ingreso mensual deseado y tus horas de trabajo.",
      en: "Calculate an estimated freelance rate based on your target monthly income and working hours."
    },
    sections: [
      {
        title: { es: "Qué pide", en: "What it asks for" },
        body: [
          {
            es: "Ingresa cuánto quieres ganar al mes, cuántos días trabajas por semana, cuántas horas al día y un margen de seguridad opcional.",
            en: "Enter how much you want to earn per month, how many days you work per week, how many hours per day, and an optional safety margin."
          },
          {
            es: "Con esos datos estima tarifa por hora, por día, por semana y el ingreso mensual objetivo.",
            en: "With that information, it estimates an hourly, daily, and weekly rate plus the target monthly revenue."
          }
        ]
      },
      {
        title: { es: "Cómo usar el resultado", en: "How to use the result" },
        body: [
          {
            es: "Úsalo como punto de partida para cotizar proyectos o comparar si una oferta freelance te conviene.",
            en: "Use it as a starting point to quote projects or compare whether a freelance offer works for you."
          },
          {
            es: "La tarifa final puede cambiar por experiencia, urgencia, complejidad, cliente, impuestos y mercado.",
            en: "The final rate may vary because of experience, urgency, complexity, client type, taxes, and market conditions."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿La herramienta descuenta impuestos?", en: "Does the tool subtract taxes?" },
        answer: {
          es: "No. Calcula una tarifa base estimada. Cada persona debe revisar sus obligaciones reales.",
          en: "No. It calculates an estimated base rate. Each person should review their own tax obligations."
        }
      },
      {
        question: { es: "¿Qué es el margen de seguridad?", en: "What is the safety margin?" },
        answer: {
          es: "Es un porcentaje adicional para cubrir imprevistos, negociación, tiempos muertos o variaciones del proyecto.",
          en: "It is an extra percentage to cover uncertainty, negotiation, downtime, or project changes."
        }
      }
    ]
  },
  "days-between-dates": {
    intro: {
      es: "Cuenta cuántos días calendario hay entre dos fechas para trámites, viajes, entregas, planeación o conteos rápidos en Colombia.",
      en: "Count how many calendar days there are between two dates for paperwork, trips, deliveries, or planning."
    },
    sections: [
      {
        title: { es: "Qué muestra", en: "What it shows" },
        body: [
          {
            es: "Entrega el total de días calendario, semanas completas y días restantes entre la fecha inicial y la final.",
            en: "It returns the total number of calendar days, full weeks, and remaining days between the start and end dates."
          },
          {
            es: "Puedes elegir si quieres incluir la fecha final en el conteo, algo útil cuando necesitas contar ambos días.",
            en: "You can choose whether to include the end date in the count, which is useful when both dates should count."
          }
        ]
      },
      {
        title: { es: "Usos comunes", en: "Common uses" },
        body: [
          {
            es: "Sirve como calculador de días para plazos personales, duración de viajes, periodos entre eventos, días calendario en Colombia o tiempo restante para una entrega.",
            en: "It is useful for personal deadlines, trip duration, time between events, calendar day counts, or the time left until a delivery."
          },
          {
            es: "No interpreta días hábiles, festivos, vencimientos legales ni reglas de entidades.",
            en: "It does not interpret business days, holidays, legal deadlines, or institution-specific rules."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Cómo calcular días entre dos fechas?", en: "How do I calculate days between two dates?" },
        answer: {
          es: "Selecciona la fecha inicial y la fecha final. La herramienta calcula los días calendario entre ambas y puede incluir la fecha final si necesitas contar ambos extremos.",
          en: "Select the start date and end date. The tool calculates calendar days between them and can include the end date when both endpoints should count."
        }
      },
      {
        question: { es: "¿Cuenta días hábiles?", en: "Does it count business days?" },
        answer: {
          es: "No. Cuenta días calendario.",
          en: "No. It counts calendar days."
        }
      },
      {
        question: { es: "¿Qué significa incluir la fecha final?", en: "What does including the end date mean?" },
        answer: {
          es: "Suma un día adicional cuando quieres contar tanto el día inicial como el día final.",
          en: "It adds one more day when you want to count both the first day and the final day."
        }
      },
      {
        question: { es: "¿Sirve como calculador de días para trámites?", en: "Can I use it as a day counter for paperwork?" },
        answer: {
          es: "Sí, sirve como referencia de días calendario. Si el trámite depende de días hábiles, festivos o reglas legales, revisa la norma específica.",
          en: "Yes, it works as a calendar day reference. If paperwork depends on business days, holidays, or legal rules, check the specific rule."
        }
      }
    ]
  },
  "days-until-date": {
    intro: {
      es: "Cuenta cuántos días faltan para una fecha futura, evento, entrega o plazo personal.",
      en: "Count how many days are left until a future date, event, delivery, or personal deadline."
    },
    sections: [
      {
        title: { es: "Qué muestra", en: "What it shows" },
        body: [
          {
            es: "Entrega días calendario restantes, semanas aproximadas, semanas completas y días sobrantes hasta la fecha objetivo.",
            en: "It returns calendar days left, approximate weeks, full weeks, and remaining days until the target date."
          },
          {
            es: "Puedes elegir si quieres incluir el día de hoy dentro del conteo.",
            en: "You can choose whether today should count as part of the period."
          }
        ]
      },
      {
        title: { es: "Usos comunes", en: "Common uses" },
        body: [
          {
            es: "Sirve para saber cuántos días faltan para una fecha, un viaje, un cumpleaños, una entrega o un evento importante.",
            en: "It helps you know how many days are left until a date, trip, birthday, delivery, or important event."
          },
          {
            es: "No interpreta días hábiles, festivos, vencimientos legales ni reglas de entidades.",
            en: "It does not interpret business days, holidays, legal deadlines, or institution-specific rules."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Cómo saber cuántos días faltan para una fecha?", en: "How do I know how many days are left until a date?" },
        answer: {
          es: "Selecciona la fecha objetivo y la herramienta cuenta los días calendario desde hoy hasta esa fecha.",
          en: "Select the target date and the tool counts calendar days from today until that date."
        }
      },
      {
        question: { es: "¿Cuenta días hábiles?", en: "Does it count business days?" },
        answer: {
          es: "No. Cuenta días calendario. Si necesitas días hábiles, festivos o reglas legales, revisa la norma correspondiente.",
          en: "No. It counts calendar days. If you need business days, holidays, or legal rules, check the relevant rule."
        }
      }
    ]
  },
  "exact-age": {
    intro: {
      es: "Calcula una edad exacta en años, meses y días a partir de una fecha de nacimiento.",
      en: "Calculate an exact age in years, months, and days from a birth date."
    },
    sections: [
      {
        title: { es: "Qué calcula", en: "What it calculates" },
        body: [
          {
            es: "Muestra edad exacta, meses totales, días totales y cuánto falta para el próximo cumpleaños.",
            en: "It shows exact age, total months, total days, and how long until the next birthday."
          },
          {
            es: "Puedes cambiar la fecha de cálculo si necesitas saber la edad en una fecha específica, no solo al día de hoy.",
            en: "You can change the calculation date if you need the age on a specific date, not only today."
          }
        ]
      },
      {
        title: { es: "Cuándo sirve", en: "When it helps" },
        body: [
          {
            es: "Es útil para formularios, trámites, requisitos de edad, documentos, colegios, viajes o simple curiosidad.",
            en: "It is useful for forms, paperwork, age requirements, documents, school, travel, or simple curiosity."
          },
          {
            es: "El resultado es calendario y puede variar frente a reglas administrativas específicas.",
            en: "The result is calendar-based and may differ from specific administrative rules."
          }
        ]
      }
    ],
    faqs: [
      {
        question: {
          es: "¿Puedo calcular la edad en una fecha pasada?",
          en: "Can I calculate age on a past date?"
        },
        answer: {
          es: "Sí. Cambia la fecha de cálculo y la herramienta usará esa fecha como referencia.",
          en: "Yes. Change the calculation date and the tool will use that date as the reference."
        }
      },
      {
        question: { es: "¿Incluye horas o minutos?", en: "Does it include hours or minutes?" },
        answer: {
          es: "No. El cálculo trabaja por fechas calendario.",
          en: "No. The calculation works with calendar dates only."
        }
      },
      {
        question: { es: "¿Qué fecha debo poner?", en: "Which date should I enter?" },
        answer: {
          es: "Pon la fecha de nacimiento de la persona y, si necesitas una edad para otro momento, cambia la fecha de cálculo.",
          en: "Enter the person's birth date and, if you need the age for another moment, change the calculation date."
        }
      }
    ]
  },
  "unit-converter": {
    intro: {
      es: "Convierte unidades comunes de longitud, peso, masa y temperatura de forma rápida.",
      en: "Convert common length, mass, weight, and temperature units quickly."
    },
    sections: [
      {
        title: { es: "Cómo funciona", en: "How it works" },
        body: [
          {
            es: "Elige el tipo de conversión, escribe el valor, selecciona la unidad de origen y la unidad destino.",
            en: "Choose the conversion type, enter the value, and select the source and destination units."
          },
          {
            es: "Puedes ajustar los decimales para ver un resultado más redondeado o más preciso.",
            en: "You can adjust the decimals to get a more rounded or more precise result."
          }
        ]
      },
      {
        title: { es: "Cuándo usarlo", en: "When to use it" },
        body: [
          {
            es: "Sirve para tareas, compras, medidas de cocina, viajes, trabajo técnico o conversiones rápidas como kilos a libras, kilómetros a millas o grados Celsius a Fahrenheit.",
            en: "Use it for homework, shopping, cooking measurements, trips, technical work, or quick conversions such as kilograms to pounds, kilometers to miles, or Celsius to Fahrenheit."
          },
          {
            es: "Usa factores estándar; algunas industrias pueden usar factores o tolerancias específicas.",
            en: "It uses standard factors; some industries may use their own factors or tolerances."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Puedo intercambiar las unidades?", en: "Can I swap the units?" },
        answer: {
          es: "Sí. Usa el botón de intercambio para cambiar origen y destino rápidamente.",
          en: "Yes. Use the swap button to change source and destination quickly."
        }
      },
      {
        question: { es: "¿El resultado es exacto?", en: "Is the result exact?" },
        answer: {
          es: "Para factores estándar sí es una conversión matemática. Puede variar si una industria usa reglas propias.",
          en: "For standard factors, yes, it is a mathematical conversion. It may vary if an industry uses its own rules."
        }
      },
      {
        question: { es: "¿Qué unidades puedo convertir?", en: "Which units can I convert?" },
        answer: {
          es: "Puedes convertir unidades comunes de longitud, peso, masa y temperatura, con decimales ajustables según la precisión que necesites.",
          en: "You can convert common length, mass, weight, and temperature units, with adjustable decimals depending on the precision you need."
        }
      }
    ]
  },
  "text-case-converter": {
    intro: {
      es: "Convierte texto a mayúsculas, minúsculas, capitalizado o tipo oración sin enviarlo a ningún servidor.",
      en: "Convert text to uppercase, lowercase, title case, or sentence case without sending it to any server."
    },
    sections: [
      {
        title: { es: "Formatos disponibles", en: "Available formats" },
        body: [
          {
            es: "Puedes convertir texto a mayúsculas, pasar mayúscula a minúscula, cambiar minúsculas a mayúsculas, capitalizar palabras o ajustar frases tipo oración.",
            en: "You can convert text to uppercase, change uppercase to lowercase, switch lowercase to uppercase, title case words, or format sentences."
          },
          {
            es: "Es útil para títulos, documentos, formularios, correos, publicaciones, limpiar texto copiado y tareas repetitivas de edición.",
            en: "It is useful for titles, documents, forms, emails, posts, and repetitive editing tasks."
          }
        ]
      },
      {
        title: { es: "Privacidad", en: "Privacy" },
        body: [
          {
            es: "La transformación ocurre en tu navegador. El texto no se envía a la API.",
            en: "The transformation happens in your browser. The text is not sent to the API."
          },
          {
            es: "Aun así, evita pegar información sensible si no es necesario.",
            en: "Even so, avoid pasting sensitive information unless you truly need to."
          }
        ]
      },
      {
        title: { es: "Cuándo usar cada formato", en: "When to use each format" },
        body: [
          {
            es: "Mayúsculas sirve para textos que deben resaltar. Minúsculas ayuda cuando recibes un texto desordenado o escrito completo en letras grandes.",
            en: "Uppercase helps text stand out. Lowercase helps when you receive messy text or text written fully in capital letters."
          },
          {
            es: "Capitalizado funciona para nombres y títulos cortos. Tipo oración funciona mejor para párrafos o frases normales.",
            en: "Title case works for names and short headings. Sentence case works better for normal phrases or paragraphs."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Cómo convertir texto a mayúsculas?", en: "How do I convert text to uppercase?" },
        answer: {
          es: "Pega tu texto, elige la opción de mayúsculas y pulsa convertir. La herramienta transforma todo el contenido en el navegador.",
          en: "Paste your text, choose uppercase, and press convert. The tool transforms the content in your browser."
        }
      },
      {
        question: { es: "¿El texto se guarda?", en: "Is the text stored?" },
        answer: {
          es: "No. La herramienta lo procesa localmente en el navegador.",
          en: "No. The tool processes it locally in the browser."
        }
      },
      {
        question: { es: "¿Tipo oración agrega puntos?", en: "Does sentence case add periods?" },
        answer: {
          es: "Sí, cuando una frase termina en letra o número y no tiene signo final, agrega punto para cerrar la oración.",
          en: "Yes. When a sentence ends in a letter or number and lacks ending punctuation, it adds a period."
        }
      },
      {
        question: { es: "¿Puedo convertir mayúsculas a minúsculas?", en: "Can I convert uppercase to lowercase?" },
        answer: {
          es: "Sí. Elige minúsculas, pega tu texto y pulsa convertir para transformar todo el contenido.",
          en: "Yes. Choose lowercase, paste your text, and press convert to transform all content."
        }
      }
    ]
  },
  "secure-password-generator": {
    intro: {
      es: "Genera contraseñas aleatorias y seguras directamente en tu navegador.",
      en: "Generate secure random passwords directly in your browser."
    },
    sections: [
      {
        title: { es: "Qué puedes configurar", en: "What you can configure" },
        body: [
          {
            es: "Elige longitud, cantidad de contraseñas y tipos de caracteres: mayúsculas, minúsculas, números y símbolos.",
            en: "Choose password length, number of passwords, and character sets: uppercase, lowercase, numbers, and symbols."
          },
          {
            es: "La herramienta muestra una estimación visual de seguridad para ayudarte a elegir una mejor combinación.",
            en: "The tool shows a visual strength estimate to help you choose a better combination."
          }
        ]
      },
      {
        title: { es: "Buenas prácticas", en: "Good practices" },
        body: [
          {
            es: "Usa contraseñas largas, únicas y diferentes para cada servicio.",
            en: "Use long, unique passwords that differ across services."
          },
          {
            es: "Si puedes, combínalas con un gestor de contraseñas y autenticación en dos pasos.",
            en: "If you can, combine them with a password manager and two-factor authentication."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Las contraseñas se envían al servidor?", en: "Are the passwords sent to a server?" },
        answer: {
          es: "No. Se generan en tu navegador.",
          en: "No. They are generated in your browser."
        }
      },
      {
        question: { es: "¿Qué longitud conviene usar?", en: "What length should I use?" },
        answer: {
          es: "Para cuentas importantes, una longitud de 16 caracteres o más suele ser una mejor base.",
          en: "For important accounts, 16 characters or more is usually a stronger baseline."
        }
      }
    ]
  },
  "case-style-converter": {
    intro: {
      es: "Convierte frases a estilos usados en programación, documentación técnica y nombres de variables.",
      en: "Convert phrases into naming styles used in programming, technical docs, and variable names."
    },
    sections: [
      {
        title: { es: "Formatos incluidos", en: "Included formats" },
        body: [
          {
            es: "Genera camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case y otros estilos comunes.",
            en: "Generate camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and other common styles."
          },
          {
            es: "Es útil para nombrar variables, archivos, rutas, clases, constantes o claves de configuración.",
            en: "It is useful for naming variables, files, routes, classes, constants, or config keys."
          }
        ]
      },
      {
        title: { es: "Cómo usarlo", en: "How to use it" },
        body: [
          {
            es: "Escribe una frase o nombre base, pulsa convertir y copia el formato que necesites.",
            en: "Write a phrase or base name, press convert, and copy the format you need."
          },
          {
            es: "El resultado no cambia hasta que vuelves a presionar convertir, para evitar sorpresas mientras editas el texto.",
            en: "The result does not change until you press convert again, so editing the text does not cause surprises."
          }
        ]
      }
    ],
    faqs: [
      {
        question: { es: "¿Esto necesita backend?", en: "Does this need a backend?" },
        answer: {
          es: "No. La conversión ocurre en el navegador.",
          en: "No. The conversion happens in the browser."
        }
      },
      {
        question: { es: "¿Cuál formato uso para JavaScript?", en: "Which format should I use for JavaScript?" },
        answer: {
          es: "Para variables suele usarse camelCase; para clases o componentes, PascalCase.",
          en: "camelCase is commonly used for variables; PascalCase for classes or components."
        }
      }
    ]
  }
};
