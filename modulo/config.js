/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela configuração de variáveis, constantes e mensagens do sistemas 
 * Autor:           Miguel Antonio
 * Data_criação:    13/10/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const MESSAGE_ERROR = {
    REQUIRED_FIELDS :   'All required fields must be filled',
    INVALID_EMAIL :     'The email format inserted is not valid',
    CONTENT_TYPE :      'The header\'s requisition does not have a valid Content-Type',
    EMPTY_BODY :        'the body of the requisition must not be empty',
    NOT_FOUND_DB :      'The register was not found in the Data Base',
    INTERNAL_ERROR_DB : 'Was not possible to complete the operation in the Data Base',
    REQUIRED_ID :       'The register\'s ID is obrigatory in this type of requisition'
};

const MESSAGE_SUCCESS = {
    INSERT_ITEM : 'Item created succesfully in the Data Base',
    UPDATE_ITEM : 'Item updated succesfully in the Data Base',
    DELETE_ITEM : 'Item deleted succesfully in the Data Base',
};

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}




