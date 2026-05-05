export type ToolContent = {
  intro: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const toolContentById: Record<string, ToolContent> = {
  "net-salary-colombia": {
    intro:
      "Esta calculadora ayuda a estimar cuánto dinero recibirías realmente después de los descuentos básicos de nómina en Colombia.",
    sections: [
      {
        title: "Qué calcula",
        body: [
          "Parte del salario mensual bruto y descuenta los aportes del empleado a salud y pensión. También puede mostrar auxilio de transporte, Fondo de Solidaridad Pensional y valores adicionales cuando aplican.",
          "El resultado es una estimación mensual y quincenal para empleados dependientes. No reemplaza el desprendible oficial de nómina ni una revisión laboral."
        ]
      },
      {
        title: "Cómo usarla",
        body: [
          "Ingresa tu salario mensual bruto, el año de reglas y cualquier descuento de nómina adicional que quieras considerar.",
          "Activa el auxilio de transporte o el Fondo de Solidaridad solo si quieres ver ese detalle en el resultado."
        ]
      }
    ],
    faqs: [
      {
        question: "¿El auxilio de transporte siempre aplica?",
        answer:
          "No. Depende del salario y de los límites legales del año seleccionado. La herramienta valida si el salario cumple el límite."
      },
      {
        question: "¿Este cálculo incluye retención en la fuente?",
        answer:
          "No. La retención, pagos no salariales, acuerdos especiales y otros conceptos pueden cambiar el valor final."
      }
    ]
  },
  "hourly-salary": {
    intro:
      "Esta calculadora convierte un salario mensual en valor por hora usando la jornada legal vigente en Colombia o una jornada personalizada.",
    sections: [
      {
        title: "Qué calcula",
        body: [
          "Transforma un salario mensual en valor por hora y por día laboral para ayudarte a comparar ofertas, presupuestos o cambios de jornada.",
          "Puedes calcular el valor bruto por hora o el valor neto estimado después de salud, pensión y Fondo de Solidaridad Pensional cuando aplica."
        ]
      },
      {
        title: "Cómo usarla",
        body: [
          "Ingresa el salario mensual, elige si quieres ver el resultado bruto o neto y revisa las horas semanales legales que aparecen por defecto.",
          "Si tu horario real es distinto al legal, usa el lápiz para editar las horas semanales y recalcular con tu jornada personalizada."
        ]
      }
    ],
    faqs: [
      {
        question: "¿La herramienta usa las horas legales de Colombia?",
        answer:
          "Sí. Por defecto toma la jornada legal vigente en Colombia según la fecha actual. Aun así puedes editarla si tu contrato o acuerdo usa otra cantidad de horas."
      },
      {
        question: "¿El cálculo neto incluye todos los descuentos posibles?",
        answer:
          "No. Estima salud, pensión y Fondo de Solidaridad Pensional cuando aplica. No incluye retención en la fuente, horas extra, recargos, auxilio de transporte ni descuentos especiales de nómina."
      }
    ]
  },
  "employee-salary-equivalent": {
    intro:
      "Esta calculadora ayuda a convertir lo que cobras por hora como independiente en un sueldo equivalente como empleado.",
    sections: [
      {
        title: "Qué calcula",
        body: [
          "Toma tu tarifa por hora y las horas que trabajas por semana para proyectar un ingreso semanal y un sueldo equivalente quincenal, mensual y anual.",
          "También estima el neto mensual y quincenal como empleado dependiente en Colombia, descontando salud, pensión y Fondo de Solidaridad Pensional cuando aplica."
        ]
      },
      {
        title: "Cómo usarla",
        body: [
          "Ingresa cuánto cobras por hora y cuántas horas trabajas por semana con ese ritmo real de trabajo.",
          "La herramienta te mostrará el equivalente como sueldo de empleado para que compares mejor ofertas, contratos o expectativas de ingreso."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Esto calcula exactamente lo que me pagarían como empleado?",
        answer:
          "No. Es una equivalencia estimada. Sirve para comparar ingresos, pero no incluye retención en la fuente, recargos, auxilios, horas extra ni condiciones especiales del contrato."
      },
      {
        question: "¿Por qué muestra bruto y neto?",
        answer:
          "Porque como empleado normalmente existe un salario bruto y luego descuentos de nómina. El neto te ayuda a entender mejor cuánto podría quedarte realmente."
      }
    ]
  },
  "employment-settlement-colombia": {
    intro:
      "Esta herramienta estima la liquidación laboral en Colombia cuando termina una relación de trabajo.",
    sections: [
      {
        title: "Qué incluye",
        body: [
          "Calcula cesantías, intereses de cesantías, prima de servicios, vacaciones pendientes, salario pendiente y otros pagos o deducciones que ingreses.",
          "Cuando eliges terminación sin justa causa, también puede estimar una indemnización según el tipo de contrato."
        ]
      },
      {
        title: "Datos importantes",
        body: [
          "Usa la fecha de inicio, fecha de finalización, salario base, tipo de contrato y motivo de terminación.",
          "El cálculo puede variar por salario variable, pactos internos, sanciones, retenciones, pagos pendientes o interpretación legal del caso."
        ]
      }
    ],
    faqs: [
      {
        question: "¿La fecha de inicio siempre se usa?",
        answer:
          "Sí, sirve para estimar los días de relación laboral y, especialmente, para la indemnización cuando hay despido sin justa causa."
      },
      {
        question: "¿La liquidación es el valor exacto que deben pagarme?",
        answer:
          "No necesariamente. Es una estimación con reglas generales y puede cambiar según documentos, contrato y condiciones particulares."
      }
    ]
  },
  "credit-interest": {
    intro:
      "Esta calculadora estima cuánto pagarías en intereses por un crédito antes de tomar una decisión de endeudamiento.",
    sections: [
      {
        title: "Qué calcula",
        body: [
          "Usa el monto del préstamo, la tasa anual, el plazo en meses y el tipo de interés para estimar intereses totales y total a pagar.",
          "Es útil para comparar escenarios simples antes de pedir un crédito o aceptar una oferta."
        ]
      },
      {
        title: "Qué no calcula",
        body: [
          "No calcula una cuota fija amortizada. Para eso usa la calculadora de cuota de préstamo.",
          "Tampoco incluye seguros, comisiones, impuestos, cargos administrativos ni cambios de tasa."
        ]
      }
    ],
    faqs: [
      {
        question: "¿La tasa es anual o mensual?",
        answer: "El campo principal usa tasa anual. La herramienta la convierte según el tipo de interés elegido."
      },
      {
        question: "¿Interés simple y compuesto dan lo mismo?",
        answer:
          "No. En el simple los intereses no generan nuevos intereses. En el compuesto, los intereses se acumulan según la capitalización."
      }
    ]
  },
  "loan-payment": {
    intro:
      "Esta calculadora estima la cuota mensual de un préstamo con pagos fijos.",
    sections: [
      {
        title: "Para qué sirve",
        body: [
          "Te ayuda a saber cuánto podrías pagar cada mes según el monto solicitado, la tasa y el plazo.",
          "También muestra el total de intereses y el valor total estimado que terminarías pagando."
        ]
      },
      {
        title: "Cómo interpretarla",
        body: [
          "En un préstamo de cuota fija, cada cuota combina capital e intereses. Al inicio pagas más interés y con el tiempo más capital.",
          "El valor real puede cambiar si el banco incluye seguros, comisiones, cargos administrativos o una tasa distinta."
        ]
      }
    ],
    faqs: [
      {
        question: "¿La cuota siempre queda fija?",
        answer:
          "En créditos de cuota fija sí se mantiene estable bajo las condiciones iniciales. Puede cambiar si la tasa es variable o hay cargos externos."
      },
      {
        question: "¿Puedo usar tasa mensual?",
        answer: "Sí. La herramienta permite elegir si la tasa ingresada es anual o mensual."
      }
    ]
  },
  "cop-usd": {
    intro:
      "Convierte pesos colombianos a dólares o dólares a pesos usando una TRM de referencia.",
    sections: [
      {
        title: "Cuándo usarlo",
        body: [
          "Sirve para estimar compras internacionales, pagos, viajes, ahorros, facturas o valores expresados en dólares.",
          "La conversión usa una tasa de referencia y evita redondeos agresivos para conservar precisión."
        ]
      },
      {
        title: "Ten en cuenta",
        body: [
          "Tu banco, tarjeta, plataforma de pago o casa de cambio puede aplicar otra tasa.",
          "También pueden existir comisiones, spreads, impuestos o cargos que no están incluidos en el cálculo."
        ]
      }
    ],
    faqs: [
      {
        question: "¿La TRM es igual a la tasa de mi banco?",
        answer: "No siempre. La TRM es una referencia; cada entidad puede manejar una tasa propia."
      },
      {
        question: "¿Puedo convertir USD a COP?",
        answer: "Sí. Cambia la dirección de conversión y escribe el monto en dólares."
      }
    ]
  },
  "worked-hours": {
    intro:
      "Esta herramienta suma horas trabajadas por jornada para empleados, freelancers o turnos independientes.",
    sections: [
      {
        title: "Qué puedes calcular",
        body: [
          "Agrega una o varias jornadas con fecha, hora de inicio y hora de finalización.",
          "La herramienta suma los minutos y los presenta como horas totales y tiempo trabajado por rango."
        ]
      },
      {
        title: "Para qué sirve",
        body: [
          "Es útil para reportes, cobros por hora, control personal de tiempo y revisión de jornadas.",
          "No evalúa recargos, horas extra legales, festivos ni reglas laborales especiales."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Puedo sumar varias jornadas?",
        answer: "Sí. Agrega todos los rangos que necesites y la herramienta los suma."
      },
      {
        question: "¿Calcula horas extra?",
        answer: "No. Solo suma tiempo trabajado; los recargos dependen de reglas laborales y acuerdos específicos."
      }
    ]
  },
  "freelance-rate": {
    intro:
      "Calcula una tarifa freelance estimada a partir de tu ingreso mensual deseado y tus horas de trabajo.",
    sections: [
      {
        title: "Qué pide",
        body: [
          "Ingresa cuánto quieres ganar al mes, cuántos días trabajas por semana, cuántas horas al día y un margen de seguridad opcional.",
          "Con esos datos estima tarifa por hora, por día, por semana y el ingreso mensual objetivo."
        ]
      },
      {
        title: "Cómo usar el resultado",
        body: [
          "Úsalo como punto de partida para cotizar proyectos o comparar si una oferta freelance te conviene.",
          "La tarifa final puede cambiar por experiencia, urgencia, complejidad, cliente, impuestos y mercado."
        ]
      }
    ],
    faqs: [
      {
        question: "¿La herramienta descuenta impuestos?",
        answer: "No. Calcula una tarifa base estimada. Cada persona debe revisar sus obligaciones reales."
      },
      {
        question: "¿Qué es el margen de seguridad?",
        answer:
          "Es un porcentaje adicional para cubrir imprevistos, negociación, tiempos muertos o variaciones del proyecto."
      }
    ]
  },
  "days-between-dates": {
    intro:
      "Cuenta cuántos días hay entre dos fechas para trámites, viajes, entregas o planeación.",
    sections: [
      {
        title: "Qué muestra",
        body: [
          "Entrega el total de días, semanas completas y días restantes entre la fecha inicial y la final.",
          "Puedes elegir si quieres incluir la fecha final en el conteo."
        ]
      },
      {
        title: "Usos comunes",
        body: [
          "Sirve para calcular plazos personales, duración de viajes, periodos entre eventos o tiempo restante para una entrega.",
          "No interpreta días hábiles, festivos, vencimientos legales ni reglas de entidades."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Cuenta días hábiles?",
        answer: "No. Cuenta días calendario."
      },
      {
        question: "¿Qué significa incluir la fecha final?",
        answer: "Suma un día adicional cuando quieres contar tanto el día inicial como el día final."
      }
    ]
  },
  "exact-age": {
    intro:
      "Calcula una edad exacta en años, meses y días a partir de una fecha de nacimiento.",
    sections: [
      {
        title: "Qué calcula",
        body: [
          "Muestra edad exacta, meses totales, días totales y cuánto falta para el próximo cumpleaños.",
          "Puedes cambiar la fecha de cálculo si necesitas saber la edad en una fecha específica."
        ]
      },
      {
        title: "Cuándo sirve",
        body: [
          "Es útil para formularios, trámites, requisitos de edad, documentos o simple curiosidad.",
          "El resultado es calendario y puede variar frente a reglas administrativas específicas."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Puedo calcular la edad en una fecha pasada?",
        answer: "Sí. Cambia la fecha de cálculo y la herramienta usará esa fecha como referencia."
      },
      {
        question: "¿Incluye horas o minutos?",
        answer: "No. El cálculo trabaja por fechas calendario."
      }
    ]
  },
  "unit-converter": {
    intro:
      "Convierte unidades comunes de longitud, peso, masa y temperatura de forma rápida.",
    sections: [
      {
        title: "Cómo funciona",
        body: [
          "Elige el tipo de conversión, escribe el valor, selecciona la unidad de origen y la unidad destino.",
          "Puedes ajustar los decimales para ver un resultado más redondeado o más preciso."
        ]
      },
      {
        title: "Cuándo usarlo",
        body: [
          "Sirve para tareas, compras, medidas de cocina, viajes, trabajo técnico o conversiones rápidas.",
          "Usa factores estándar; algunas industrias pueden usar factores o tolerancias específicas."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Puedo intercambiar las unidades?",
        answer: "Sí. Usa el botón de intercambio para cambiar origen y destino rápidamente."
      },
      {
        question: "¿El resultado es exacto?",
        answer:
          "Para factores estándar sí es una conversión matemática. Puede variar si una industria usa reglas propias."
      }
    ]
  },
  "text-case-converter": {
    intro:
      "Transforma texto a mayúsculas, minúsculas, capitalizado o tipo oración sin enviarlo a ningún servidor.",
    sections: [
      {
        title: "Formatos disponibles",
        body: [
          "Puedes convertir todo el texto a letras grandes, letras pequeñas, capitalizar palabras o ajustar frases tipo oración.",
          "Es útil para títulos, documentos, formularios, correos y tareas repetitivas de edición."
        ]
      },
      {
        title: "Privacidad",
        body: [
          "La transformación ocurre en tu navegador. El texto no se envía a la API.",
          "Aun así, evita pegar información sensible si no es necesario."
        ]
      }
    ],
    faqs: [
      {
        question: "¿El texto se guarda?",
        answer: "No. La herramienta lo procesa localmente en el navegador."
      },
      {
        question: "¿Tipo oración agrega puntos?",
        answer:
          "Sí, cuando una frase termina en letra o número y no tiene signo final, agrega punto para cerrar la oración."
      }
    ]
  },
  "secure-password-generator": {
    intro:
      "Genera contraseñas aleatorias y seguras directamente en tu navegador.",
    sections: [
      {
        title: "Qué puedes configurar",
        body: [
          "Elige longitud, cantidad de contraseñas y tipos de caracteres: mayúsculas, minúsculas, números y símbolos.",
          "La herramienta muestra una estimación visual de seguridad para ayudarte a elegir una mejor combinación."
        ]
      },
      {
        title: "Buenas prácticas",
        body: [
          "Usa contraseñas largas, únicas y diferentes para cada servicio.",
          "Si puedes, combínalas con un gestor de contraseñas y autenticación en dos pasos."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Las contraseñas se envían al servidor?",
        answer: "No. Se generan en tu navegador."
      },
      {
        question: "¿Qué longitud conviene usar?",
        answer: "Para cuentas importantes, una longitud de 16 caracteres o más suele ser una mejor base."
      }
    ]
  },
  "case-style-converter": {
    intro:
      "Convierte frases a estilos usados en programación, documentación técnica y nombres de variables.",
    sections: [
      {
        title: "Formatos incluidos",
        body: [
          "Genera camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case y otros estilos comunes.",
          "Es útil para nombrar variables, archivos, rutas, clases, constantes o claves de configuración."
        ]
      },
      {
        title: "Cómo usarlo",
        body: [
          "Escribe una frase o nombre base, pulsa convertir y copia el formato que necesites.",
          "El resultado no cambia hasta que vuelves a presionar convertir, para evitar sorpresas mientras editas el texto."
        ]
      }
    ],
    faqs: [
      {
        question: "¿Esto necesita backend?",
        answer: "No. La conversión ocurre en el navegador."
      },
      {
        question: "¿Cuál formato uso para JavaScript?",
        answer: "Para variables suele usarse camelCase; para clases o componentes, PascalCase."
      }
    ]
  }
};
