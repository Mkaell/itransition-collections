import { Chip } from "@mui/material"
import { Utils } from "../../../utils/utils"
import ActionButtons from "./ActionButtons";
import { EDIT_TABLE_FALSE, EDIT_TABLE_TRUE, FIELD_BOOLEAN, FIELD_DATE, FIELD_ID, FIELD_NUMERICAL, FIELD_TAGS } from "./columnConstatns";

const comparison = (currentUser, collection, right, incorrect) =>{
    if(currentUser?.role || (collection.userId === currentUser?._id)){
        return right
    } else {
        return incorrect
    }
    
}
export const columnsСonverter = (additionalFieldsEntries, basicFieldsEntries, deleteCurrentItem, likeIthemByCurrentUser, currentUser, collection, messages) => {

    const columnsObj = [];

    if(currentUser){
        columnsObj.push({
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            editable: EDIT_TABLE_FALSE,
            headerAlign: 'center',
            getActions: (params) => [
                <ActionButtons 
                    params={params} 
                    deleteCurrentItem={deleteCurrentItem}  
                    likeIthemByCurrentUser={likeIthemByCurrentUser} 
                    currentUser={currentUser} 
                    collection={collection}
                    messages={messages}
                />
            ]
        })
    }
   
    basicFieldsEntries.map((field) => {
        switch (field) {
            case FIELD_ID:
                columnsObj.push({
                    'field': '_id',
                    headerName: 'ID',
                    editable: EDIT_TABLE_FALSE,
                    minWidth: 50,
                })
                break;
            case FIELD_TAGS:
                columnsObj.push({
                    'field': field,
                    editable: EDIT_TABLE_FALSE,
                    minWidth: 200,
                    renderCell: (params) => (
                        params.formattedValue ?
                        params.formattedValue.map(tag => 
                            <Chip
                                sx={{ p: 0 }}
                                label={tag}
                            />)
                            : null
                    ),
                })
                break;
        
            default:
                columnsObj.push({
                    'field': field,
                    minWidth: 150,
                    editable: comparison(currentUser, collection,EDIT_TABLE_TRUE, EDIT_TABLE_FALSE),
                })
                break;
        }
    })

    additionalFieldsEntries.map(fields => {
        switch (fields[0]) {
            case FIELD_NUMERICAL:
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'number',
                        headerAlign: 'center',
                        minWidth: 150,
                        editable: comparison(currentUser, collection,EDIT_TABLE_TRUE, EDIT_TABLE_FALSE),
                    })
                })
                break;
            case FIELD_BOOLEAN:
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'boolean',
                        headerAlign: 'center',
                        minWidth: 50,
                        editable: comparison(currentUser, collection,EDIT_TABLE_TRUE, EDIT_TABLE_FALSE),
                    })
                })
                break;
            case FIELD_DATE:
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'date',
                        headerAlign: 'center',
                        minWidth: 150,
                        editable: comparison(currentUser, collection,EDIT_TABLE_TRUE, EDIT_TABLE_FALSE),
                    })
                })
                break;
            default:
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'string',
                        headerAlign: 'center',
                        minWidth: 150,
                        editable: comparison(currentUser, collection,EDIT_TABLE_TRUE, EDIT_TABLE_FALSE),
                    })
                })
                break;
        }
    })   
        
    return columnsObj
}