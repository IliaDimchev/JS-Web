const { categoryMap } = require('../constants');

exports.getCategoryViewData = (selectedCategory) => {
    categories = Object.keys(categoryMap).map(key => ({
        value: key,
        label: categoryMap[key],
        isSelected: selectedCategory == key,
    }));

    return categories;
};