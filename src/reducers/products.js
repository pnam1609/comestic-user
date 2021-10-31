import * as Types from './../constants/ProductTypes';

var initialState = []

const products = (state = initialState, action) => {
    if (action.type === Types.FETCH_PRODUCTS) {
        // console.log(action)
        let list = action.product.filter(pro => pro.SanPhams !== null &&
            pro.productName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(action.keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1)
        // pro.TEN.toLowerCase().indexOf(action.keyword.toLowerCase()) !== -1)
        return [...list];
    }
    return state;
}

export default products