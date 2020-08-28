import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionService', () => {


  beforeEach(() => TestBed.configureTestingModule({}))
 

  it('should be created', () => {
    const service:SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  })


  xit('Should clear previous session if outdated.', ()=> {
    const service:SessionService = TestBed.get(SessionService);
    let sessionSpy = spyOn(sessionStorage, 'clear') 
    spyOn((service as any), 'clearSessionIfOutdated').and.callFake(()=> {
      let outdatedDate = this.setOutdatedCriteria()
      let sessionDate = outdatedDate.setMonths(-10)
      if (sessionDate < outdatedDate) sessionStorage.clear()
    })
    expect(sessionSpy).toHaveBeenCalled()
  })


  xit('Should listen for onLoginOutcome event', ()=> {
    const service:SessionService = TestBed.get(SessionService);
  })


  xit('Should set session values onLoginOutcome success.', ()=> {
    const service:SessionService = TestBed.get(SessionService);
  })


  xit('Should clear session values onLoginOutcome false.', ()=> {
    const service:SessionService = TestBed.get(SessionService);
  })



})
