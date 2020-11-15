// const deleteProduct = (btn) => {
//     const prodId = btn.parentNode.querySelector('[name=productId]').value;
//     const csrf = btn.parentNode.querySelector('[name=csrf]').value;

//     fetch('/product/' + prodId, {
//         method: 'DELETE',
//         /*since the csurf package looks for the csrf token in the querry params and even in headers,
//         we can send the csrf token in the headers as we are not able to send it through req.body.
//         This is because delete requests donot have body */
//         headers: {
//             'csrf-token': csrf
//         }
//     })
//     .then()
//     .catch()
// }