import { TestBed } from '@angular/core/testing';

import { PushNotificationJobMakerService } from './push-notification-job-maker.service'

describe('ScheduledJobCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: PushNotificationJobMakerService = TestBed.get(PushNotificationJobMakerService);
    expect(service).toBeTruthy();
  });
});
