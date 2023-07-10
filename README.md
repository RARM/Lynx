# Lynx Client Project (Group 10)
If you're on the lookout for a top-notch digital distribution service storefront for video games - particularly indie games - then you needn't look any further than Lynx. Built with a priority on independent creators' works by providing an extensive array of titles, primarily targeted towards PC gamers or anyone interested in playing indie or third-party software. 

Lynx has four principal sections: The store section features tailored filters for users' personalized recommendations based on their liking, while allowing them to purchase new games at ease. The library section enables efficient organization and tracking owned content, alongside providing ample room for exploration. Community section allows users the ability to participate in forums, discussion groups or offer feedback directly designed by game creators who actively monitor it themselves. Last but not least, with user profile section makes customization and personalization truly accessible. 

Generating revenue purely from game sales and optional and purchasable cosmetics alone; Lynx refrains from overcrowding its platform by shunning advertisements or subscription services, which can sometimes spoil customer perception of the platform. It will be a native platform on only Windows PC; however, there are plans for potential expansion in due course, allowing other Operating Systems to be used to run Lynx. 

What sets Lynx apart is its emphasis on supporting game creators of all sizes and building communities around games and computer software. All donations made to game creators using fundraising features will go directly to them, with Lynx only profiting from cosmetics and a portion of game sales in the store. Lynx’s primary goal will be to attract indie developers and fans of indie games by providing an easy-to-enter market with a wide array of features and promotional tools to efficiently market games to users from within the client.

Our goal at Lynx is to create a platform that respects and supports both users and creators of video games, in the hopes of fostering a loyal and happy community.


## Getting Started
The Lynx Client is in its early prototype phase. The prototype is viewable through pdf, but is not interactable. The interactable prototype, which uses Figma, is available through the following link: https://www.figma.com/proto/sy1Ynb5VuXwE8MsZPXS4JR/

The current website for Lynx is available at https://lynxgamestore.com/ . However, the download link is not yet working.

## Team
Lynx Team is made up of the following contributors and roles:
- Scrum Master - Rodolfo Andres Rivas Matta
- Product Owner - Mike Clopton
- Backend Team Lead - Hunter Bresler
- Front-End Lead Developer - Cody Smith
- GitHub Master - Normil Luccin

## Directory Structure
* `site`: Contains the source code for the main website (it only serves static files).
* `server`: It contains the source code for the Lynx client. It runs on Django (use the requirements.txt file to create a virtual environment with the required packages).
* `client`: It has the source code for the Lynx client.
* `docs`: Documentation for the project (requirements, design, code reference, etc.).

## Development
### Backend
The Lynx server runs on Linux, Apache2, and Python. It uses the Django REST Framework (DRF). To set up your local development environment, follow these steps:
1. Install you have Python installed. To check your Python installation, run: `python --version`
1. Create a Python virtual environment in your local repository. The path `venv` is already ignored in the '.gitignore' file. You can create the environment using this command: [command]
1. Activate your local environment.
1. Install all required packages running: `pip install -r requirements.txt`
1. If you make changes to the list of packages for the environment, save them with this command: `pip freeze > requirements.txt`
1. Navigate to the `server` directory.
1. **To run the application**, enter: `python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000`

### Front-end
The Lynx client runs on Electron and is supposed to run only on Windows computers. Follow these steps to set up your local development environment:
1. Install NodeJS. Check your installation by running: `node -v`
1. Navitage to the `client` directory.
1. Install all required packages using this command: `npm install`
1. **To run the application**, enter: `npm start`
