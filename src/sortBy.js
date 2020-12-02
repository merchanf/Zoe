const sortBy = {
  incomeAsc: (a, b) => {
    const a_ = parseInt(a.income, 10);
    const b_ = parseInt(b.income, 10);
    if (a_ < b_) {
      return -1;
    }
    if (a_ > b_) {
      return 1;
    }
  
    return 0;
  },

  incomeDesc: (a, b) => (a, b) => {
    const a_ = parseInt(a.income, 10);
    const b_ = parseInt(b.income, 10);
    if (a_ > b_) return -1;
    if (a_ < b_) return 1;
    return 0;
  },

  id: (a, b) => {
    const a_ = a.id
    const b_ = b.id
    if (a_ < b_) return -1;
    if (a_ > b_) return 1;
    return 0;
  },

  name: (a, b) => {
    const a_ = a.name;
    const b_ = b.name;
    if (a_ < b_) return -1;
    if (a_ > b_) return 1;
    return 0;
  },
}

export default sortBy;