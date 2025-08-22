class DuneCountdown {
    constructor() {
        this.targetDate = new Date('September 18, 2025 00:00:00').getTime();
        this.previousValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };
        this.isComplete = false;
        this.init();
    }

    init() {
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;

        if (timeLeft <= 0) {
            this.handleComplete();
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const currentValues = { days, hours, minutes, seconds };

        // Update each unit if value changed
        Object.keys(currentValues).forEach(unit => {
            if (currentValues[unit] !== this.previousValues[unit]) {
                this.updateUnit(unit, currentValues[unit]);
            }
        });

        this.previousValues = currentValues;
    }

    updateUnit(unit, value) {
        const digits = unit === 'days' ? 3 : 2;
        const formattedValue = value.toString().padStart(digits, '');
        
        // Set next values
        for (let i = 0; i < digits; i++) {
            const nextElement = document.getElementById(`${unit}-digit-${i}-next`);
            if (nextElement) {
                nextElement.textContent = formattedValue[i];
            }
        }

        // Trigger flip animation
        const container = document.getElementById(`${unit}-container`);
        container.classList.add('flipping');

        setTimeout(() => {
            // Update current values
            for (let i = 0; i < digits; i++) {
                const currentElement = document.getElementById(`${unit}-digit-${i}`);
                const nextElement = document.getElementById(`${unit}-digit-${i}-next`);
                if (currentElement && nextElement) {
                    currentElement.textContent = nextElement.textContent;
                }
            }

            // Remove flip class
            container.classList.remove('flipping');
        }, 300);
    }

    handleComplete() {
        if (this.isComplete) return;
        
        this.isComplete = true;
        clearInterval(this.interval);

        // Set all values to 0
        ['days', 'hours', 'minutes', 'seconds'].forEach(unit => {
            const digits = unit === 'days' ? 3 : 2;
            for (let i = 0; i < digits; i++) {
                const element = document.getElementById(`${unit}-digit-${i}`);
                if (element) {
                    element.textContent = '0';
                }
            }
        });

        // Add completion styling
        document.querySelector('.timer-container').classList.add('countdown-complete');
        
        // Update title
        document.querySelector('.title').textContent = 'The Prophecy is Fulfilled';
        document.querySelector('.subtitle').textContent = 'The Desert Blooms';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DuneCountdown();
});