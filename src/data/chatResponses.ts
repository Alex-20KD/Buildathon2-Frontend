import type { FrequentQuestion } from "@/types";

export const frequentQuestions: FrequentQuestion[] = [
  {
    id: "fq-1",
    label: "Permiso de funcionamiento",
    question: "¿Qué necesito para obtener el permiso de funcionamiento?",
  },
  {
    id: "fq-2",
    label: "Impuesto predial",
    question: "¿Cómo puedo pagar el impuesto predial de mi propiedad?",
  },
  {
    id: "fq-3",
    label: "Patente municipal",
    question: "¿Cuáles son los requisitos para obtener la patente municipal?",
  },
  {
    id: "fq-4",
    label: "Permiso de construcción",
    question: "¿Qué documentos necesito para un permiso de construcción?",
  },
  {
    id: "fq-5",
    label: "Denuncias",
    question: "¿Cómo puedo presentar una denuncia ciudadana?",
  },
];

const responseMap: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["funcionamiento"],
    answer:
      "Para obtener el Permiso de Funcionamiento necesitas: copia de cédula, RUC o RISE actualizado, pago del impuesto predial del local y el certificado de no adeudar al municipio. El tiempo estimado es de 3 a 5 días hábiles y el costo es de $25.00. ¿Quieres que te ayude a iniciar el trámite?",
  },
  {
    keywords: ["predial", "impuesto"],
    answer:
      "El pago del impuesto predial se calcula según el avalúo catastral de tu propiedad. Puedes consultarlo con tu número de predio o cédula y pagarlo en línea de forma inmediata. ¿Deseas que te muestre el enlace al trámite de Pago Predial?",
  },
  {
    keywords: ["patente"],
    answer:
      "Para la Patente Municipal necesitas tu RUC o RISE vigente, copia de cédula y la declaración de impuesto a la renta o ingresos. El trámite toma entre 1 y 2 días hábiles. ¿Quieres iniciar el proceso ahora?",
  },
  {
    keywords: ["construccion", "construcción"],
    answer:
      "El Permiso de Construcción requiere la escritura o certificado de propiedad, planos arquitectónicos firmados por un profesional y el certificado de línea de fábrica. El tiempo estimado es de 10 a 15 días hábiles. ¿Te gustaría ver el detalle completo del trámite?",
  },
  {
    keywords: ["denuncia"],
    answer:
      "Puedes presentar una denuncia ciudadana indicando tus datos personales, una descripción detallada del hecho y la ubicación referencial. El proceso es gratuito y se resuelve en un plazo de 5 días hábiles. ¿Deseas iniciar tu denuncia ahora?",
  },
  {
    keywords: ["certificado", "uso de suelo"],
    answer:
      "Los certificados municipales (no adeudar, uso de suelo, avalúo catastral, entre otros) se emiten en 1 a 3 días hábiles con un costo entre $5.00 y $15.00. ¿Qué tipo de certificado necesitas?",
  },
  {
    keywords: ["cita", "agendar"],
    answer:
      "Puedes agendar una cita presencial desde la sección de Citas, eligiendo la fecha, hora y el tipo de trámite que necesitas realizar. ¿Quieres que te lleve a esa sección?",
  },
];

const defaultAnswer =
  "Gracias por tu consulta. Puedo ayudarte con información sobre permisos, impuestos, patentes, certificados, denuncias y citas municipales. ¿Podrías darme más detalles sobre lo que necesitas?";

export function getSimulatedResponse(question: string): string {
  const normalized = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const match = responseMap.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  return match ? match.answer : defaultAnswer;
}
