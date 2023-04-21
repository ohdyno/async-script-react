`
(() => {
const _testElementId = document.createElement('p')
_testElementId.setAttribute('data-cy', 'load-script')
_testElementId.append("script has been executed!")
document.body.append(_testElementId)
})()
`
