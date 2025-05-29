// Field types and their validation rules
export const FIELD_TYPES = {
  VARCHAR: 'varchar',
  CHAR: 'char',
  DECIMAL: 'decimal'
};

// Validation rules generator
export const createValidationRule = (type, config) => {
  const rules = {
    type,
    ...config
  };

  if (type === FIELD_TYPES.DECIMAL) {
    rules.pattern = /^\d{1,10}(\.\d{1,2})?$/;
    rules.message = rules.message || "Formato inválido. Use hasta 10 dígitos y 2 decimales";
  }

  return rules;
};

// Field validations
export const fieldValidations = {
  nombre: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 250, required: true }),
  apPaterno: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 25 }),
  apMaterno: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 25 }),
  nombres1: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 25 }),
  nombres2: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 25 }),
  tipoDocumento: createValidationRule(FIELD_TYPES.CHAR, { length: 2, required: true }),
  numeroDocumento: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 15 }),
  correo1: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 50 }),
  correo2: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 50 }),
  correo3: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 50 }),
  direccion: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 250 }),
  pais: createValidationRule(FIELD_TYPES.CHAR, { length: 2 }),
  departamento: createValidationRule(FIELD_TYPES.CHAR, { length: 2 }),
  provincia: createValidationRule(FIELD_TYPES.CHAR, { length: 2 }),
  distrito: createValidationRule(FIELD_TYPES.CHAR, { length: 2 }),
  ubigeo: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 11 }),
  longitud: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 30 }),
  latitud: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 30 }),
  telefono1: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 15 }),
  telefono2: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 15 }),
  contacto1: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 35 }),
  contacto2: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 35 }),
  cargo1: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 35 }),
  cargo2: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 35 }),
  formaPago: createValidationRule(FIELD_TYPES.CHAR, { length: 2 }),
  descuento: createValidationRule(FIELD_TYPES.DECIMAL, {}),
  tipoVenta: createValidationRule(FIELD_TYPES.CHAR, { length: 1 }),
  tipoCliente: createValidationRule(FIELD_TYPES.CHAR, { length: 1 }),
  ciiu: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 4 }),
  nombreComercial: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 120 }),
  estadoSunat: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 25 }),
  condicionSunat: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 25 }),
  lineaCredito1: createValidationRule(FIELD_TYPES.CHAR, { length: 1 }),
  lineaCredito2: createValidationRule(FIELD_TYPES.DECIMAL, {}),
  lineaCredito3: createValidationRule(FIELD_TYPES.VARCHAR, { maxLength: 250 })
};

// Generic validation function
export const validateField = (name, value) => {
  const rules = fieldValidations[name];
  if (!rules) return null;

  if (rules.required && !value) {
    return `Campo ${name} es requerido`;
  }

  if (rules.length && value && value.length !== rules.length) {
    return `Campo ${name} debe tener exactamente ${rules.length} caracteres`;
  }

  if (rules.maxLength && value && value.length > rules.maxLength) {
    return `Campo ${name} debe tener máximo ${rules.maxLength} caracteres`;
  }

  if (rules.pattern && value && !rules.pattern.test(value)) {
    return rules.message;
  }

  return null;
};