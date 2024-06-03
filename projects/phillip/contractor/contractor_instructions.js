document.addEventListener('DOMContentLoaded', function() {
    const instructionsContainer = document.getElementById('instructions');
    const instructions = [
        {
            title: '1. Safety and Environment Management System',
            content: 'Details of a formalized Safety and Environment Management System, including the Safety and Environment Policy signed by senior management.'
        },
        {
            title: '2. Legislation Register',
            content: 'Safety and Environment legislation register, subscription to legislation changes, industry association memberships, and copies of relevant Acts, Regulations, and Codes of Practice.'
        },
        {
            title: '3. Work Cover Certificate',
            content: 'Copy of current Work Cover Queensland Certificate of Currency.'
        },
        {
            title: '4. Hazard Identification Procedure',
            content: 'Documented procedure for hazard identification, risk assessment/management, along with examples of completed risk assessment forms and registers, including environmental risks.'
        },
        {
            title: '5. Safety and Environment Goals',
            content: 'Corporate document with Safety and Environment goals, objectives, and performance metrics.'
        },
        {
            title: '6. Supervisor Training',
            content: 'Supervisor/Leader training materials and evidence of mandatory Supervisor Training.'
        },
        {
            title: '7. Training and Competency Procedure',
            content: 'Documented procedure/process on training and competency, along with examples of training databases/registers and safety training records.'
        },
        {
            title: '8. Safety and Environment Committee Documents',
            content: 'Safety and Environment Committee documents, including meeting minutes and communication materials.'
        },
        {
            title: '9. High-Risk Work Activities Management',
            content: 'Management of high-risk work activities documentation, including plans and evidence of implementation.'
        },
        {
            title: '10. Change Management Procedure',
            content: 'Management of change procedure and examples of change assessments.'
        },
        {
            title: '11. Emergency Procedures',
            content: 'Documented emergency procedures and requirements for recording and reporting Safety and Environment performance.'
        },
        {
            title: '12. Safety and Environment Reports',
            content: 'Safety and Environment reports/statistical analysis trends, including documented minutes from monthly management meetings.'
        },
        {
            title: '13. Contract Review Meetings',
            content: 'Examples of contract review meetings agenda/reports/minutes and documented outcomes.'
        },
        {
            title: '14. Incident Reporting Procedure',
            content: 'Incident reporting & investigation procedure, including incident report forms.'
        },
        {
            title: '15. Internal Audit Process',
            content: 'Internal audit process documentation, including schedules, audits, and review reports.'
        },
        {
            title: '16. Management Review Procedure',
            content: 'Procedure for regular management review of the Safety and Environment Management System.'
        }
    ];

    instructions.forEach(function(instruction, index) {
        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'instruction';
        instructionDiv.id = `instruction${index + 1}`;

        const title = document.createElement('h2');
        title.textContent = instruction.title;
        
        const content = document.createElement('p');
        content.textContent = instruction.content;

        const dismissBar = document.createElement('div');
        dismissBar.className = 'dismiss-bar';

        instructionDiv.appendChild(title);
        instructionDiv.appendChild(content);
        instructionDiv.appendChild(dismissBar);

        instructionsContainer.appendChild(instructionDiv);

        let hoverTimeout;

        dismissBar.addEventListener('mouseenter', function() {
            hoverTimeout = setTimeout(function() {
                instructionDiv.classList.add('dismissed');
                setTimeout(function() {
                    instructionDiv.remove();
                }, 500);
            }, 1500); // Hover time before dismissal starts

            // Slowly fill the dismiss bar with a darker color
            dismissBar.style.transition = 'background-color 1.5s ease-in';
            dismissBar.style.backgroundColor = '#ff7f50'; // coral
        });

        dismissBar.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);

            // Reset the dismiss bar color if the hover is cancelled
            dismissBar.style.transition = 'background-color 0.3s ease';
            dismissBar.style.backgroundColor = '#ffa07a'; // light coral
        });
    });
});
