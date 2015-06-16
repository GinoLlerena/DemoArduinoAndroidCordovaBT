//  Elaborado por Gino Llerena
//  https://ginollerena.wordpress.com/
//  Trujillo - Perú

#include <LiquidCrystal.h>
#include <SoftwareSerial.h>

#define RxD 0
#define TxD 1

#define KEY 5

#define maxLCD 16
#define maxBuffer 200

SoftwareSerial BTSerial(RxD, TxD);
LiquidCrystal lcd(7, 8, 9, 10, 11 , 12);

String inData;
String inDisplay = "ARDUINO + APACHE CORDOVA + IONIC ==>> EXCELENTE!!!";

void setup()
{
  
  pinMode(KEY, OUTPUT);
  
  // Estado inicial
  digitalWrite(KEY, LOW); 
   
  
  // Configuracion de la comunicación con el modulo HC-05
  BTSerial.begin(9600);
  BTSerial.flush();
  delay(500);
  
  // Configuración del puerto serie de Arduino para debug.
  Serial.begin(9600);
  Serial.println("Ready");

  // Configuración del LCD.
  lcd.begin(16, 1);
  lcd.setCursor(16,1);
  lcd.autoscroll();
}

void loop()
{

  while (BTSerial.available() > 0)    {
        char r = BTSerial.read();
        if (r == '\n')
        {
            Serial.print("Arduino Recibió: ");
            Serial.print(inData);
            inDisplay = inData;
            inData = "";     
        }
        else         
          inData += r; 
    }  
      printLcd();
}

void printLcd()
{
    char charBuf[maxBuffer];
    int lastStringLength = inDisplay.length();
    int minChars = maxLCD;
    if (lastStringLength > maxLCD) {
        int saldo = lastStringLength % maxLCD;
        minChars = lastStringLength + ( maxLCD - saldo);
    }
    inDisplay.toCharArray(charBuf, lastStringLength + 1);
    char key;
    lcd.clear();
    lcd.setCursor(16,1);
    for (int i = 0; i < minChars; i++) {
      if ( i < lastStringLength)
         key = charBuf[i];  
      else
         key = ' ';
      lcd.print(key);
      delay(500);  
    }
}
