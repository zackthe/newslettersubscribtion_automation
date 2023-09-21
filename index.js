const puppeteer = require('puppeteer');
const fs = require('fs');

require('console-stamp')(console, { 
    format: ':date(yyyy/mm/dd HH:MM:ss.l)' 
} );

(async () => {

    try {

        // Function that reads files with  path

        const readFileLines = filename =>
            fs.readFileSync(filename)
                .toString('UTF8')
                .split("\n");

        // Calling the readFiles function with file name
       // let arr = readFileLines('C:\\Users\\admin\\OneDrive\\029__new_operations\\newsletter-planing\\rotation '+process.argv[2]+'\\rdp'+process.argv[3]+' list '+process.argv[3]+'.txt');      

        let arr = readFileLines('C:\\Users\\user1\\Desktop\\newsletter_script\\email_list.txt');      
        
        // Randomize the order of newsletter's subscription :

        function randomize(array_newsletter,arg){

                    let array_randomized = [] ;
            
                    for(i=0; i < 15 ; i++){
            
                        let random_number = Math.floor(Math.random()*(arg-2)); 
                        //console.log(random_number);
            
                        if (!array_randomized.includes(array_newsletter[random_number])){
            
                               array_randomized.push(array_newsletter[random_number])  
            
                                }
                    }
                    return array_randomized;
                }

        // delay timing function 

        function delay(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
         }

         // timing calculation function :

         function msToTime(duration) {
            var milliseconds = Math.floor((duration % 1000) / 100),
              seconds = Math.floor((duration / 1000) % 60),
              minutes = Math.floor((duration / (1000 * 60)) % 60),
              hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            return hours + " h : " + minutes + " m : " + seconds + " s : " + milliseconds;
          }

        // Iterating over list of emails 

        let counter = 0 ;

        var start = new Date() ;
              

        for (const email of arr) {          

            counter++

            const browser = await puppeteer.launch({headless: "new"});

            
            // READ the newsletter text file

           // const newsletter_urls = readFileLines('C:\\Users\\admin\\OneDrive\\029__new_operations\\newsletter-planing\\newsletters.txt');

            const newsletter_urls = readFileLines('C:\\Users\\user1\\Desktop\\newsletter_script\\newsletter_urls.txt');

            /*const randomized_newsletters =  randomize(newsletter_urls,newsletter_urls.length);*/

            console.log('Email number : ['+counter+'] '+email);

            //console.log(randomized_newsletters);

            // iterating over list of newsletter urls for every email  

            for (let i = 0; i < newsletter_urls.length; i++) {

                /* const url = randomized_newsletters[i];*/

                const url = newsletter_urls[i];

                const page = await browser.newPage();

                await page.setDefaultNavigationTimeout(0);


                try {
                    await page.goto(`${url}`);
                    await page.evaluate((email) => {
                        // Your existing code for page automation here

                        let my_mail = email;

                        let Fname = 'james'

                        let Lname = 'mcgill';

                        let Zip = '40000'

                        let input_Names = document.querySelectorAll('input[type="text"]');

                        let input_email = document.querySelectorAll('input[type="email"]') ? Array.from(document.querySelectorAll('input[type="email"]')) : '';

                        let input_check = document.querySelectorAll('input[type="checkbox"]');

                        let button_type_submit = document.querySelectorAll('button[type="submit"]');

                        let newsletter_link = document.querySelectorAll('a');

                        let button_type_button = document.querySelectorAll('button[type="button"]');

                        let Formik_submit = document.querySelectorAll('button[data-element="submit"]');

                        let input_type_submit = document.querySelectorAll('input[type="submit"]');

                        let scripts = document.getElementsByTagName("script");

                        let captcha_flag = false;

                        // check if captcha is on the site : 

                        for (var i = 0; i < scripts.length; i++) {

                            if (scripts[i].src.toLowerCase().includes('recaptcha')) {
                                captcha_flag = true;
                            }

                        }

                        // email input :

                        input_email.forEach(i => i.value = my_mail)

                        // check first name

                        for (const i of input_Names) {

                            i ? i.attributes.placeholder ? i.attributes.placeholder.value.toLowerCase().includes('first') ? i.value = Fname : '' : '' : '';
                            i ? i.attributes.placeholder ? i.attributes.placeholder.value.toLowerCase().includes('last') ? i.value = Lname : '' : '' : '';
                            i ? i.attributes.name ? i.attributes.name.value.toLowerCase().includes('first') ? i.value = Lname : '' : '' : '';
                            i ? i.attributes.name ? i.attributes.name.value.toLowerCase().includes('name') ? i.value = Lname : '' : '' : '';
                            i ? i.attributes.name ? i.attributes.name.value.toLowerCase().includes('last') ? i.value = Lname : '' : '' : '';

                            i ? i.attributes.id ? i.attributes.id.value.toLowerCase().includes('mail') ? i.value = my_mail : '' : '' : '';
                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('mail') ? i.value = my_mail : '' : '' : '';
                            i ? i.attributes.placeholder ? i.attributes.placeholder.value.toLowerCase().includes('mail') ? i.value = my_mail : '' : '' : '';
                            i ? i.attributes.name ? i.attributes.name.value.toLowerCase().includes('mail') ? i.value = my_mail : '' : '' : '';
                            i ? i.attributes.placeholder ? i.attributes.placeholder.value.toLowerCase().includes('zip') ? i.value = Zip : '' : '' : '';
                        }

                        // check all inputs : 

                        input_check.forEach(i => i.checked = true)

                        document.querySelector('input[name="subscribe"]') ? setTimeout(() => { document.querySelector('input[name="subscribe"]').click() }, 2500) : '';

                        // input type submit and search to ignore :

                        for (const i of input_type_submit) {

                            i.attributes.class.value == 'formEmailButton' ? i.disabled = true : '';
                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('search') ? i.disabled = true : '' : '' : '';
                            i ? i.attributes.id ? i.attributes.id.value.toLowerCase().includes('search') ? i.disabled = true : '' : '' : '';
                            i ? i.attributes.value ? i.attributes.value.value.toLowerCase().includes('search') ? i.disabled = true : '' : '' : '';

                            // captcha_flag ? alert('captcha flag') : i.click();

                            captcha_flag ? window.close() : i.click();
                        }

                        // formik submit :

                        for (const i of Formik_submit) {

                            i.attributes.class.value.toLowerCase().includes('formkit-submit') ? setTimeout(() => { i.click() }, 1200) : '';
                        }

                        // link to newsletter button 

                        for (const i of newsletter_link) {

                            i.attributes.id ? i.attributes.id.value.toLowerCase().includes('newsletter') ? setTimeout(() => { i.click() }, 1200) : '' : '';
                            i.attributes.class ? i.attributes.class.value.toLowerCase().includes('newsletter') ? setTimeout(() => { i.click() }, 1200) : '' : '';
                        }

                        // Submit buttons type submit with text inside :

                        for (const i of button_type_submit) {

                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('search') ? i.disabled = true : '' : '' : '';
                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('submit') ? setTimeout(() => { i.click() }, 1200) : '' : '' : '';
                            i.id ? i.attributes.id.value.toLowerCase().includes('sign') ? setTimeout(() => { i.click() }, 1200) : '' : '';
                            i.value ? i.attributes.value.value.toLowerCase().includes('subscribe') ? setTimeout(() => { i.click() }, 1200) : '' : '';
                            i.innerHTML.toLowerCase().includes('sign') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('submit') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('subscribe') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('join') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('get') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('try') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('send') ? setTimeout(() => { i.click() }, 1200) : '';
                            i.innerHTML.toLowerCase().includes('go') ? setTimeout(() => { i.click() }, 1200) : '';

                        }

                        // check for button type button and text inside (subscribe / join ...) : 

                        for (const i of button_type_button) {

                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('subscribe') ? setTimeout(() => { i.click() }, 2000) : '' : '' : '';
                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('join') ? setTimeout(() => { i.click() }, 2000) : '' : '' : '';
                            i ? i.attributes.class ? i.attributes.class.value.toLowerCase().includes('get') ? setTimeout(() => { i.click() }, 2000) : '' : '' : '';
                            i ? i.attributes.id ? i.attributes.id.value.toLowerCase().includes('signup') ? setTimeout(() => { i.click() }, 2000) : '' : '' : '';

                            i ? i.innerHTML.toLowerCase().includes('try') ? setTimeout(() => { i.click() }, 1200) : '' : '';

                            i ? i.innerHTML.toLowerCase().includes('get') ? setTimeout(() => { i.click() }, 1200) : '' : '';

                            i ? i.innerHTML.toLowerCase().includes('Join ') ? setTimeout(() => { i.click() }, 1200) : '' : '';

                            i ? i.innerHTML.toLowerCase().includes('ready ') ? setTimeout(() => { i.click() }, 1200) : '' : '';
                            i ? i.innerHTML.toLowerCase().includes('subscribe ') ? setTimeout(() => { i.click() }, 1200) : '' : '';

                        }
                  

                    }, email);
                } catch (error) {

                    // Handle the error for this specific URL, e.g., log it

                    console.error('Error processing URL:', url, 'Error:', error.message);
                } finally {
                   // await page.close();
                }

                // closes every page after the subscription with a delay

                //await delay(2000)
                //await page.close();
            }

            // closes the browser after the compeletion of subscriptions 

            await browser.close();
            console.log(" SUCCESS :) ")

        }


    } catch (error) {

        console.log('========= This is the F error ==========>>' + error)

    } 
    
    finally{
        
        var end = new Date() - start;
        
        console.log("=============== FINISHED IN :  => "+msToTime(end)+" ===============");
    }

})()



//BY ZAKARIAE _ BELKASMI

