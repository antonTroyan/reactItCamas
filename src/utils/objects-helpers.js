export const updateObjectInArray = (items, itemId, objPropName, newObjectProps) => {
    // function will find element with name from parameter, make copy 
    // and set new element
    return items.map(element => {
        if (element[objPropName] === itemId) {
            return {...element, ...newObjectProps}
        }
        return element;
    })

}