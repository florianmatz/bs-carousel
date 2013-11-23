@ECHO OFF

CLS

REM ------------------------------------------------------------------------------------------------------------------
REM Führt einen Build mittels grunt durch
REM ------------------------------------------------------------------------------------------------------------------

ECHO Build wird gestartet...
ECHO %time:~0,8%

ECHO.

for %%X in (grunt.cmd) do (set FOUND=%%~$PATH:X)
if not defined FOUND (
    echo grunt nicht verfügbar! Bitte installiere node.js und grunt.js!
    echo node.js auf nodejs.org downloaden und installieren. Führe anschließend folgendes Kommando auf der Kommandozeile - CMD aus: npm install -g grunt
    goto :END
) else (
    echo grunt wurde gefunden und wird den Build/Deploy ausfuehren!
    echo.
    call grunt.cmd build
)

ECHO.

:END

ECHO Build wurde beendet...
ECHO %time:~0,8%

PAUSE

REM -------------------------- E O F ---------------------------