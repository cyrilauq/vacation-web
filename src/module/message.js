export class Message {
    /**
     * 
     * @param {TypeMessage} type    Type de message
     * @param {String} contenu      Contenu du message
     */
    constructor(type, contenu) {
        this.type = type;
        this.contenu = contenu;
    }
}