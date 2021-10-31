import React from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { actDeleteProductInCart, actUpdateProductInCart } from '../../actions/cart'
import isEmpty from "validator/lib/isEmpty"

export const CartItem = ({ item, onUpdateCart, onDeleteCart }) => {

    const [quantity, setQuantity] = useState(item.quantity)
    const [old, setold] = useState(item.quantity)
    const [validationMsg, setvalidationMsg] = useState("")

    function validateAll() {
        var msg = {}
        if (isEmpty(quantity.toString())) {
            msg.quantity = "Trường này không được để trống"
        }
        else if (quantity - parseInt(quantity) !== 0) {
            msg.quantity = "Trường này phải là số nguyên"
        }
        else if (quantity <= 0) {
            msg.quantity = "Số lượng phải lớn hơn 0"
        } else if (quantity > item.product.quantityInStock) {
            msg.quantity = `Số lượng tồn còn ${item.product.quantityInStock} vui lòng chọn ít hơn`
        }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    function updateQuantity(productId) {
        const isValid = validateAll()
        if (isValid && quantity !== parseInt(item.quantity)) {
            setold(quantity)
            onUpdateCart(productId, quantity)
        } else {
            setQuantity(old)
        }

    }
    return (
        <tr>
            <td className="col-md-6">
                <figure className="media ">
                    <div className="img-wrap"><img src={item.product.image} className="img-thumbnail img-sm" alt="" /></div>
                    <figcaption className="media-body">
                        <h6 className="title" style={{ width: 300 }}>{item.product.productName}</h6>
                        <dl className="dlist-inline small">
                            <dt>Dung tích:&nbsp; </dt>
                            <dd>{item.product.sex === 1 ? "Nam" : item.product.sex === 2 ? "Nữ" :  "Unisex"}</dd>
                        </dl>
                        <dl className="dlist-inline small">
                            <dt>Hãng:&nbsp; </dt>
                            <dd>{item.product.brand.brandName}</dd>
                        </dl>
                    </figcaption>
                </figure>
            </td>
            <td className="col-md-2">
                <div className="input-group input-group-sm mb-3">
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                        value={quantity}
                        onBlur={() => updateQuantity(item.product.productId)}
                        onChange={e => setQuantity(e.target.value)} />
                </div>
                <div className="row"><small className="form-text text-danger">{validationMsg.quantity}</small></div>

            </td>
            <td className="col-md-2">
                <div className="price-wrap">
                    <div className="">
                        {item.product.detailPromotion !== null ? <NumberFormat value={item.product.price * (100 - item.product.detailPromotion.percentDiscount) / 100} displayType={'text'} thousandSeparator={true} suffix={'đ'} /> : ""}
                    </div>
                    {item.product.detailPromotion === null ? <NumberFormat value={item.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /> :
                        <del><NumberFormat value={item.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></del>}
                </div>
            </td>
            <td className="text-right col-md-2" >
                <button className="btn btn-outline-danger btn-round" onClick={() => onDeleteCart(item.product.productId)}>
                    <i className="far fa-trash-alt"></i>
                    &nbsp;Xóa</button>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        onUpdateCart: (MA_SP, quantity) => {
            dispatch(actUpdateProductInCart(MA_SP, quantity))
        },
        onDeleteCart: (MA_SP) => {
            dispatch(actDeleteProductInCart(MA_SP))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
