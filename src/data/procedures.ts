import type { Procedure } from "@/types";

export const procedures: Procedure[] = [
  {
    id: "1",
    slug: "permiso-funcionamiento",
    name: "Permiso de Funcionamiento",
    category: "Permisos",
    description:
      "Autorización municipal para el funcionamiento de locales comerciales, industriales o de servicios dentro del cantón Portoviejo.",
    estimatedTime: "3 - 5 días hábiles",
    cost: "$25.00",
    icon: "Store",
    requirements: [
      "Copia de cédula del propietario o representante legal",
      "RUC o RISE actualizado",
      "Copia del pago del impuesto predial del local",
      "Certificado de no adeudar al municipio",
    ],
    documents: [
      "Formulario de solicitud de permiso de funcionamiento",
      "Croquis de ubicación del local",
      "Permiso del Cuerpo de Bomberos",
    ],
    steps: [
      "Ingresar la solicitud en línea o en ventanilla municipal",
      "Adjuntar los requisitos y documentos solicitados",
      "Pago de la tasa correspondiente",
      "Inspección del local por parte del municipio",
      "Emisión y entrega del permiso",
    ],
  },
  {
    id: "2",
    slug: "permiso-construccion",
    name: "Permiso de Construcción",
    category: "Permisos",
    description:
      "Autorización para iniciar, ampliar o remodelar una edificación cumpliendo con las normativas urbanísticas municipales.",
    estimatedTime: "10 - 15 días hábiles",
    cost: "Variable según m²",
    icon: "HardHat",
    requirements: [
      "Escritura o certificado de propiedad del terreno",
      "Planos arquitectónicos firmados por profesional",
      "Pago del impuesto predial al día",
      "Certificado de línea de fábrica",
    ],
    documents: [
      "Formulario único de construcción",
      "Planos estructurales",
      "Estudio de suelos (si aplica)",
    ],
    steps: [
      "Presentar la solicitud con planos aprobados",
      "Revisión técnica por el departamento de planificación",
      "Pago de tasas municipales",
      "Aprobación y emisión del permiso",
    ],
  },
  {
    id: "3",
    slug: "pago-predial",
    name: "Pago Predial",
    category: "Impuestos",
    description:
      "Consulta y pago del impuesto predial urbano o rústico correspondiente a tu propiedad dentro del cantón.",
    estimatedTime: "Inmediato",
    cost: "Según avalúo catastral",
    icon: "Receipt",
    requirements: [
      "Número de predio o cédula del propietario",
      "Datos catastrales actualizados",
    ],
    documents: ["Comprobante de pago del año anterior (referencial)"],
    steps: [
      "Consultar el valor del predio",
      "Seleccionar el año o periodo a pagar",
      "Realizar el pago en línea o ventanilla",
      "Descargar el comprobante de pago",
    ],
  },
  {
    id: "4",
    slug: "patente-municipal",
    name: "Patente Municipal",
    category: "Impuestos",
    description:
      "Registro y pago anual obligatorio para personas naturales y jurídicas que ejercen una actividad económica en Portoviejo.",
    estimatedTime: "1 - 2 días hábiles",
    cost: "Según tabla de ingresos",
    icon: "BadgeCheck",
    requirements: [
      "RUC o RISE vigente",
      "Copia de cédula",
      "Declaración de impuesto a la renta o ingresos",
    ],
    documents: ["Formulario de declaración de patente"],
    steps: [
      "Registrar la actividad económica",
      "Declarar los ingresos del periodo",
      "Pago del valor calculado",
      "Emisión del certificado de patente",
    ],
  },
  {
    id: "5",
    slug: "denuncias",
    name: "Denuncias Ciudadanas",
    category: "Denuncias",
    description:
      "Canal para reportar novedades, infracciones o problemas relacionados con servicios municipales, espacio público o construcciones.",
    estimatedTime: "5 días hábiles",
    cost: "Gratuito",
    icon: "Megaphone",
    requirements: [
      "Datos personales del denunciante",
      "Descripción detallada del hecho",
      "Ubicación o dirección referencial",
    ],
    documents: ["Evidencia fotográfica (opcional)"],
    steps: [
      "Registrar la denuncia con los datos del caso",
      "Asignación a la dependencia correspondiente",
      "Seguimiento e investigación",
      "Notificación de resolución",
    ],
  },
  {
    id: "6",
    slug: "certificados",
    name: "Certificados Municipales",
    category: "Certificados",
    description:
      "Emisión de certificados de no adeudar, uso de suelo, avalúo catastral y otros documentos oficiales municipales.",
    estimatedTime: "1 - 3 días hábiles",
    cost: "$5.00 - $15.00",
    icon: "FileCheck2",
    requirements: [
      "Cédula de identidad",
      "Número de predio (si aplica)",
    ],
    documents: ["Formulario de solicitud de certificado"],
    steps: [
      "Seleccionar el tipo de certificado",
      "Completar el formulario de solicitud",
      "Pago de la tasa correspondiente",
      "Descarga o retiro del certificado",
    ],
  },
];

export const procedureCategories = [
  "Todos",
  "Permisos",
  "Impuestos",
  "Denuncias",
  "Certificados",
];
