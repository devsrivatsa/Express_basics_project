const deleteProductAsync = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=product_id]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    
    const productElement = btn.closest('article');


    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        /*since the csurf package looks for the csrf token in the querry params and even in headers,
        we can send the csrf token in the headers as we are not able to send it through req.body.
        This is because delete requests donot have body */
        headers: {
            'csrf-token': csrf
        }
    })
    .then(result => {
        productElement.parentNode.removeChild(productElement);
        consle.log('prouct deleted!')
    })
    .catch(err => {
        console.log(err);
    })
}

// module.exports = deleteProduct;