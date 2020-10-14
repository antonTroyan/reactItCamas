export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjectProps: any) => {
    // function will find element with name from parameter, make copy 
    // and set new element
    return items.map((element: { [x: string]: any; }) => {
        if (element[objPropName] === itemId) {
            return {...element, ...newObjectProps}
        }
        return element;
    })

}