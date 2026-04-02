const medicines = [
  { id: 1, name: 'Paracetamol', genericName: 'acetaminophen', dosage: '500mg', stock: 100 },
  { id: 2, name: 'Ibuprofen', genericName: 'ibuprofen', dosage: '200mg', stock: 50 },
];

export const listMedicines = async () => medicines;

export const createMedicine = async (payload) => {
  const id = medicines.length ? medicines[medicines.length - 1].id + 1 : 1;
  const medicine = { id, ...payload };
  medicines.push(medicine);
  return medicine;
};
