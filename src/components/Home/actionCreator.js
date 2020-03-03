export default {
    GoBack(bool){
        return {
            type: 'GOBACK'
            ,payload:bool
        }
    },
    Show(bool){
        return {
            type: 'SHOW'
            ,payload:bool
        }
    }
    
}