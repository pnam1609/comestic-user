import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { actFetchBrandReq } from '../../actions/brand'
import { actFetchProductsRequest } from '../../actions/product'
import ProductItems from './ProductItems'

function Search({ onFetchLineProduct, product, brand }) {

    let match = useRouteMatch()
    // let location = useLocation()
    // const [sort, setSort] = useState('')
    const [products, setProducts] = useState('')
    const [keywordSearch, setKeywordSearch] = useState('')

    const [filter, setFilter] = useState({
        brand: '',
        priceStart: '',
        priceEnd: '',
        gender: ''
    })
    const [price, setPrice] = useState({
        max: '',
        min: ''
    })
    // useEffect(() => {
    //     if (products !== '') {
    //         if (sort === 'gia') {
    //             console.log(products)
    //             let list = products.sort((a, b) => {
    //                 return a.price - b.price
    //             })
    //             setProducts(list)
    //         } else {

    //         }
    //     }
    //     // return () => {
    //     //     setProducts(product)
    //     // }
    //     //eslint-disable-next-line
    // }, [sort])

    // console.log(filter)

    useEffect(() => {
        (async () => {
            // const query = new URLSearchParams(location.search);
            // let keyword = query.get('keyword')

            setKeywordSearch(match.params.keyword)
            await onFetchLineProduct(match.params.keyword === null ? "" : match.params.keyword.replace(/\s+/g, ' ').trim())
        })()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        setProducts(product)
    }, [product])

    useEffect(() => {
        var temp = product
        if (products !== '') {
            if (filter.brand !== '') {
                temp = temp.filter(pro => pro.brandId === parseInt(filter.brand))
                // setProducts(listFilterBrand)
            }
            if (filter.priceStart !== '' && filter.priceEnd !== '') {
                temp = temp.filter(pro => pro.price >= filter.priceStart && pro.price <= filter.priceEnd)
                // setProducts(filter)
            } else if (filter.priceStart !== '') {
                temp = temp.filter(pro => pro.price >= filter.priceStart)
            } else if (filter.priceEnd !== '') {
                temp = temp.filter(pro => pro.price <= filter.priceEnd)
            }

            if (filter.gender === 'nam') {
                temp = temp.filter(pro => parseInt(pro.sex) === 1)
            } else if (filter.gender === 'nu') {
                temp = temp.filter(pro => parseInt(pro.sex) === 2)
            }
            else if (filter.gender === 'unisex') {
                temp = temp.filter(pro => parseInt(pro.sex) === 3)
            }
            setProducts(temp)
            return () => {
                setProducts(product)
            }
        }//eslint-disable-next-line
    }, [filter])


    const handleApplyPrice = () => {
        setFilter({
            ...filter,
            priceStart: price.min === "" ? "" : parseInt(price.min.slice(0, price.min.length - 1).replace(/,/g, "")),
            priceEnd: price.max === "" ? "" : parseInt(price.max.slice(0, price.max.length - 1).replace(/,/g, ""))
        })

        // console.log(parseInt(price.min.slice(0, price.min.length - 1).replace(/,/g, "")))
        // console.log(price.max.slice(0, price.max.length - 1).replace(/,/g, ""));
    }
    return (
        <section className="section-content bg padding-y">
            <div className="container">
                {/* <div className="row" style={{ marginLeft: 20 }}>
                    

                </div> */}
                <div className="row">
                    <aside className="col-sm-3">
                        <div className="py-3  mb-20" style={{ marginLeft: 20 }}>
                            <h3 className="m-0 font-weight-bold text-primary" style={{ fontSize: 18 }}>
                                <i className="fas fa-filter"></i>&nbsp;
                                B??? L???C T??M KI???M
                            </h3>
                        </div>
                        <div className="card card-filter">
                            <article className="card-group-item">
                                <header className="card-header">
                                    <a className="" aria-expanded="true" href="/#" data-toggle="collapse"
                                        data-target="#collapse22" style={{ textDecoration: 'none' }}>
                                        <i className="icon-action fa fa-chevron-down"></i>
                                        <h6 className="title">Theo h??ng</h6>
                                    </a>
                                </header>
                                <div className="filter-content collapse show" id="collapse22">
                                    <div className="card-body">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="brandAll"
                                                value=''
                                                onChange={e => setFilter({ ...filter, brand: e.target.value })}
                                                defaultChecked
                                            />
                                            <label className="form-check-label" htmlFor="brandAll">
                                                T???t c???
                                            </label>
                                        </div>
                                        {brand.map((bra, index) => {
                                            return <div key={index} className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault1" id={bra.brandId}
                                                    value={bra.brandId}
                                                    onChange={e => setFilter({ ...filter, brand: e.target.value })}
                                                />
                                                <label className="form-check-label" htmlFor={bra.brandId}>
                                                    {bra.brandName}
                                                </label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </article>
                            <article className="card-group-item">
                                <header className="card-header">
                                    <a href="/#" data-toggle="collapse" data-target="#collapse33" style={{ textDecoration: 'none' }}>
                                        <i className="icon-action fa fa-chevron-down"></i>
                                        <h6 className="title">L???c theo gi??  </h6>
                                    </a>
                                </header>
                                <div className="filter-content collapse show" id="collapse33">
                                    <div className="card-body">
                                        <div className="form-row">
                                            <label>Gi?? kh???i ??i???m</label>
                                            <NumberFormat className="form-control" thousandSeparator={true}
                                                placeholder="0??" suffix={'??'}
                                                value={price.min}
                                                onChange={e => setPrice({ ...price, min: e.target.value })} />
                                            {/* <input className="form-control" placeholder="$0" type="number"
                                                value={filter.priceStart}
                                                onChange={e => setFilter({ ...filter, priceStart: e.target.value })} /> */}

                                        </div>
                                        <div className="form-row">
                                            <label>Gi?? t???i ??a</label>
                                            <NumberFormat className="form-control" thousandSeparator={true}
                                                placeholder="1,000,000??" suffix={'??'}
                                                value={price.max}
                                                onChange={e => setPrice({ ...price, max: e.target.value })} />
                                        </div>
                                        <button onClick={() => handleApplyPrice()} className="btn btn-block btn-outline-primary"
                                            style={{ marginTop: 20 }}>??p d???ng</button>
                                    </div>
                                </div>
                            </article>
                            <article className="card-group-item">
                                <header className="card-header">
                                    <a href="/#" data-toggle="collapse" data-target="#collapse44" style={{ textDecoration: 'none' }}>
                                        <i className="icon-action fa fa-chevron-down"></i>
                                        <h6 className="title">?????i t?????ng c???a s???n ph???m </h6>
                                    </a>
                                </header>
                                <div className="filter-content collapse show" id="collapse44">
                                    <div className="card-body">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioForAll"
                                                value='' defaultChecked
                                                onChange={e => setFilter({ ...filter, gender: e.target.value })}
                                            />
                                            <label className="form-check-label" htmlFor="radioForAll">
                                                T???t c???
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioForNam"
                                                value='nam'
                                                onChange={e => setFilter({ ...filter, gender: e.target.value })}
                                            />
                                            <label className="form-check-label" htmlFor="radioForNam">
                                                Nam
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioForNu"
                                                value='nu'
                                                onChange={e => setFilter({ ...filter, gender: e.target.value })}
                                            />
                                            <label className="form-check-label" htmlFor="radioForNu">
                                                N???
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioForNu"
                                                value='unisex'
                                                onChange={e => setFilter({ ...filter, gender: e.target.value })}
                                            />
                                            <label className="form-check-label" htmlFor="radioForNu">
                                                Unisex
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>

                    </aside>
                    <main className="col-sm-9">
                        <div className="py-3  mb-20" style={{ marginLeft: 15 }}>
                            <h3 className="m-0 font-weight-bold text-primary" style={{ fontSize: 16 }}>
                                <i className="far fa-lightbulb"></i>&nbsp;
                                K???t qu??? t??m ki???m cho t??? kho?? '{keywordSearch}'
                            </h3>
                        </div>
                        {/* <div className="row" style={{ marginLeft: 3, fontSize: 18, marginBottom: 20 }}>
                            <span>S???p x???p theo&nbsp;&nbsp;&nbsp;</span>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="gia"
                                    onChange={e => setSort(e.target.value)} />
                                <label className="form-check-label" htmlFor="inlineCheckbox1">Gi??</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="khuyen mai"
                                    onChange={e => setSort(e.target.value)} />
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Khuy???n m??i</label>
                            </div>
                        </div> */}
                        <div className="col-md-12">
                            <div className="filters-content">
                                <div className="row grid">
                                    {products === '' ? '' : products.map((pro, index) => {
                                        return <ProductItems key={index} item={pro} grid={4} />
                                    })}
                                </div>
                            </div>
                        </div>

                    </main>
                </div>

            </div>
        </section>
    )
}



const mapStateToProps = (state) => ({
    product: state.products,
    brand: state.brands
})

const mapDispatchToProps = dispatch => {
    return ({
        onFetchLineProduct: (keyword) => {
            dispatch(actFetchProductsRequest(keyword))
        },
        onFetchBrand: () => {
            dispatch(actFetchBrandReq())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)


