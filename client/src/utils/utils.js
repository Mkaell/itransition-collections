export class Utils {
    
    static capitalized(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    static comparison = (currentUser, collection, right, incorrect) =>{
        if(currentUser?.role || (collection.userId === currentUser?._id)){
            return right
        } else {
            return incorrect
        }
        
    }

}

