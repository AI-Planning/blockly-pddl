//tgroup = Functions
// Application layer functions, available to be part of DFA
#define NUM_ENTRY_FUNCTIONS 3
static uint16_t s_Entry_Stub(int16_t entry_par);                            //ttag = Parameter:None:Unit:
static uint16_t s_Entry_SetSetpoint(int16_t entry_par);                    //ttag = Parameter:Pressure:Unit:PSI
static uint16_t s_Entry_StartProcess(int16_t entry_par);                    //ttag = Parameter:None:Unit:
static uint16_t s_Entry_StopProcess(int16_t entry_par);                     //ttag = Parameter:None:Unit:

#define NUM_INPUT_FUNCTIONS 3
static uint16_t s_Input_DoNow(int16_t input_par, uint16_t timeout);                    //ttag = Parameter:None:Timeout
static uint16_t s_Input_PatternDetected(int16_t input_par, uint16_t timeout);          //ttag = Parameter:None:Timeout
static uint16_t s_Input_CheckCondition(int16_t input_par, uint16_t timeout);           //ttag = Parameter:None:Timeout

//tgroup = Tick
//ttag = 100ms