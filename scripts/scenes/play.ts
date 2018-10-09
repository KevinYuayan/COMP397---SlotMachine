module scenes{
    export class Play extends objects.Scene{
        // Private instance variables
        private _slotMachine:objects.SlotMachine;
        // public variables

        // constructor
        constructor() {
            super();
        }
        // private methods

        // public methods
        
        public Main(): void {
            this._slotMachine = new objects.SlotMachine("slotMachine");
        }
        public Start(): void {
        }
        public Update(): void {
            this._slotMachine.Update();
        }
        public Reset(): void {
        }
        public Destroy(): void {
        }


    }
}